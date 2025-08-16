import { Link } from "react-router";
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
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string()
})

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-row place-content-center">
        <header className="flex flex-row h-24 w-screen max-w-[1448px] p-6 items-center justify-between">
          <img
            src={logoDark}
            width="120"
            height="20"
          />
          <div className="flex flex-row gap-3">
            <Button className="rounded-sm font-normal" size="sm">Sign Up</Button>
          </div>
        </header>
      </div>
      <main className="grid grid-cols-[repeat(1fr, 2fr, 1fr)] items-center h-[500px] place-content-center">
        <div className="flex flex-col border items-center justify-center p-12 gap-6 col-start-2 col-end-2">
          <h1 className="text-4xl tracking-tight">Welcome to Neomall</h1>
          <Form {...form}>
            <form className="flex flex-col gap-6">
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
                        <Input placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="tracking-tight rounded-full gap-6" type="submit">Log in to your account</Button>            
            </form>
          </Form>
          <p className="text-sm tracking-tight font-light">Don't have an account?<Button className="text-md font-normal" variant="link">Sign Up</Button></p>
        </div>
      </main>
    </div>
    );
}