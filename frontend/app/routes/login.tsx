/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

import { Link, useNavigate, useLocation } from "react-router";
import logoDark from "~/assets/neomall-darkmode-logo.svg";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "~/hooks/redux-hooks";
import { loginUser } from "~/features/authentication/authenticationSlice";
import axios from "axios";
import { getTokenExpiry } from "~/utils/jwt";

const loginFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string()
})

export default function LoginPage() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username: values.username,
        password: values.password
      }, {
        withCredentials: true
      });

      const data = res.data as { token: string, user: any };
      const role = (data.user.role || '').toLowerCase();
      form.formState.errors.root?.type == "Authentication Error" && form.clearErrors();
      dispatch(loginUser({
        username: data.user.username,
        name: data.user.name || data.user.businessName || data.user.username,
        token: data.token,
        tokenExpiry: getTokenExpiry(data.token),
        role: role,
        profilePicture: data.user.profilePicture || null,
        address: data.user.address || null,
        distributionHub: data.user.distributionHub || null
      }));

      // Check if there's a redirect path from the protected route
      const from = location.state?.from;
      
      if (from) {
        // Redirect to the originally requested page
        navigate(from, { replace: true });
      } else {
        // Default role-based navigation
        if (role === 'customer') navigate('/shop');
        else if (role === 'vendor') navigate('/my-products');
        else if (role === 'shipper') navigate('/delivery');
        else navigate('/homepage');
      }
    } catch (err) {
      form.setError("root", {
        type: "Authentication Error",
        message: "Invalid username or password. Please try again."
      });
    }
  }

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-row place-content-center">
        <header className="flex flex-row h-24 w-screen max-w-[1448px] p-6 items-center justify-between">
          <Link to="/">
            <img
              className="cursor-pointer"
              src={logoDark}
              width="96.82"
              height="17.23"
            />
          </Link>
          <div className="flex flex-row gap-3">
            <Link to="/signup">
              <Button className="rounded-sm font-normal cursor-pointer" size="sm">Sign Up</Button>
            </Link>
          </div>
        </header>
      </div>
      <main className="grid grid-cols-[repeat(1fr, 2fr, 1fr)] items-center h-[500px] place-content-center">
        <div className="flex flex-col border items-center justify-center p-12 gap-6 col-start-2 col-end-2">
          <h1 className="text-4xl tracking-tight">Welcome to Neomall</h1>
          <Form {...form}>
            <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3 w-80">
                <FormField 
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="password" placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              { 
                form.formState.errors.root?.type == "Authentication Error" &&
                <p className="text-sm text-muted-foreground">Invalid username or password. Please try again.</p> 
              }
              <Button className="tracking-tight rounded-full gap-6" type="submit">Log in to your account</Button>            
            </form>
          </Form>
          <p className="text-sm tracking-tight font-light">
            Don't have an account?
            <Link to="/signup">
              <Button className="text-md font-normal cursor-pointer" variant="link">Sign Up</Button>
            </Link>
          </p>
        </div>
      </main>
    </div>
    );
}