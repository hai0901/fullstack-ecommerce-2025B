import { cn } from "~/lib/utils";
import { Card, CardContent } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ProfilePictureInput from "./profile-pic-input";
import { Button } from "../ui/button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDebouncedCallback } from 'use-debounce';
import { isUsernameTaken } from "~/lib/validations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useAppDispatch } from "~/hooks/redux-hooks";
import { loginUser } from "~/features/authentication/authenticationSlice";
import { useNavigate } from "react-router";
import { getTokenExpiry } from "~/utils/jwt";

const shipperSignUpFormSchema = z.object({
  username: z
    .string({message: "Please enter username."})
    .min(2, {message: "Username must be at least 2 characters."})
    .max(30, {message: "Username must be at most 30 characters."})
    .regex(/^[a-zA-Z0-9._-]+$/, {message: "Only letters, numbers, ., _, - are allowed."})
    .refine(
      async (username) => !(await isUsernameTaken(username)),
      { message: "This username is already taken" }
    )
  ,
  password: z
    .string({message: "Please enter password."})
    .min(8, {message: "Password must be at least 8 characters."})
    .regex(/[a-z]/, {message: "Password must contain at least one lowercase letter"})
    .regex(/[A-Z]/, {message: "Password must contain at least one uppercase letter"})
    .regex(/[0-9]/, {message: "Password must contain at least one number"})
    .regex(/[^a-zA-Z0-9]/, {message: "Password must contain at least one special character"})
  ,
  distributionHub: z
    .literal(["hochiminh", "hanoi", "danang"])
})

// submit will be defined inside the component to access avatar state

export default function ShipperSignUpCard() {
  const shipperSignUpForm = useForm<z.infer<typeof shipperSignUpFormSchema>>({
    resolver: zodResolver(shipperSignUpFormSchema),
    defaultValues: {
      username: "",
      password: "",
      distributionHub: undefined
    }
  });
  const [avatarURL, setAvatarURL] = useState("");
  const [croppedImgURL, setCroppedImgURL] = useState("");
  const validForm = Boolean(croppedImgURL ? croppedImgURL : avatarURL) && shipperSignUpForm.formState.isValid;
  const usernameTrigger = useDebouncedCallback(() => shipperSignUpForm.trigger("username"), 500);
  const passwordTrigger = useDebouncedCallback(() => shipperSignUpForm.trigger("password"), 500);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof shipperSignUpFormSchema>) => {
    try {
      const hubMap: Record<string, string> = {
        hochiminh: 'Ho Chi Minh',
        hanoi: 'Hanoi',
        danang: 'Da Nang',
      };
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          role: 'shipper',
          distributionHub: hubMap[values.distributionHub as keyof typeof hubMap],
          avatarDataUrl: (croppedImgURL || avatarURL) || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Registration failed');
      
      // Auto-login after successful registration
      const role = (data.user.role || '').toLowerCase();
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

      // Navigate based on role
      if (role === 'customer') navigate('/shop');
      else if (role === 'vendor') navigate('/my-products');
      else if (role === 'shipper') navigate('/delivery');
      else navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card>
      <CardContent>
        <Form {...shipperSignUpForm}>
          <form className="grid gap-6" onSubmit={shipperSignUpForm.handleSubmit(onSubmit)}>
            <FormField 
              control={shipperSignUpForm.control}
              name="username"
              render={({ field }) => (
                <FormItem className="grid gap-3">
                  <Label>Username</Label>
                  <FormControl 
                    onChange={usernameTrigger}
                  >
                    <Input 
                      {...field} 
                      placeholder="Username" 
                    />
                  </FormControl>
                  {/* <FormMessage/> */}
                </FormItem>
              )}
            />
            <FormField 
              control={shipperSignUpForm.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-3">
                  <Label>Password</Label>
                  <Popover>
                    <PopoverTrigger>
                      <FormControl
                        onChange={passwordTrigger}
                      >
                        <Input type="password" {...field} placeholder="Password" />
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      onOpenAutoFocus={(e) => e.preventDefault()}
                      className="w-full"
                      side="right"
                      sideOffset={10}
                    >
                      <ul className="text-xs text-muted-foreground">
                        <li className={cn("transition", field.value?.length >= 8 && "text-white")}>At least 8 characters</li>
                        <li className={cn("transition", field.value?.match(/[a-z]/) && "text-white")}>One lowercase letter</li>
                        <li className={cn("transition", field.value?.match(/[A-Z]/) && "text-white")}>One uppercase letter</li>
                        <li className={cn("transition", field.value?.match(/[^a-zA-Z0-9]/) && "text-white")}>One special character</li>
                        <li className={cn("transition", field.value?.match(/[0-9]/) && "text-white")}>One number</li>
                      </ul>
                    </PopoverContent>
                  </Popover> 
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField 
              control={shipperSignUpForm.control}
              name="distributionHub"
              render={({ field }) => (
                <FormItem className="grid gap-3">
                  <Label>Distribution Hub</Label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Your Distribution Hub" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-87.5">
                        <SelectItem value="hochiminh">Ho Chi Minh</SelectItem>
                        <SelectItem value="danang">Da Nang</SelectItem>
                        <SelectItem value="hanoi">Ha Noi</SelectItem>
                      </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-3">
              <Label>Profile Picture</Label>
              <ProfilePictureInput 
                avatarURL={avatarURL}
                setAvatarURL={setAvatarURL}
                croppedImgURL={croppedImgURL}
                setCroppedImgURL={setCroppedImgURL}
              />
            </div>
            <Button
              type="submit" 
              className="tracking-tight rounded-full gap-6 mx-auto"
            >
              Confirm
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}