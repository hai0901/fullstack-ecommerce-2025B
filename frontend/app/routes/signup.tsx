import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import logoDark from "~/assets/neomall-darkmode-logo.svg";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {useDropzone} from 'react-dropzone';
import { useRef, useCallback, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import ProfilePictureInput from "~/components/signup/profile-pic-input";
import { Check } from "lucide-react";
import { cn } from "~/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"

async function isUsernameTaken(username: string): Promise<boolean> {
  const taken = ["admin", "test", "alice"]; // example existing usernames
  return taken.includes(username.toLowerCase());
}

const customerSignUpFormSchema = z.object({
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
  name: z
    .string({message: "Please enter your name."})
    .min(8, {message: "Name must be at least 8 characters"}),
  address: z.string({message: "Please enter address."}),
  // profilePicture: z
  //   .file()
  //   .mime(["image/png", "image/jpeg"], {message: "Profile picture must be a .png or .jpeg file."})
})

export default function SignUpPage() {
  const customerSignUpForm = useForm<z.infer<typeof customerSignUpFormSchema>>({
    resolver: zodResolver(customerSignUpFormSchema)
  });

  function onSubmit(values: z.infer<typeof customerSignUpFormSchema>) {
    console.log(values)
  }

  console.log(customerSignUpForm);

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
            <Link to="/login">
              <Button className="rounded-sm font-normal cursor-pointer" size="sm">Log In</Button>
            </Link>
          </div>
        </header>
      </div>
      <main className="flex flex-col w-full h-full items-center">
        <h1 className="text-4xl tracking-tight">Welcome to Neomall</h1>
        <h2 className="font-normal tracking-tight mt-2.5 text-muted-foreground">Create your new account as</h2>
        <div className="flex w-200 flex-col items-center gap-6 pb-6">
          <Tabs defaultValue="customer">
            <TabsList className="mx-auto my-3">  
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="vendor">Vendor</TabsTrigger>
              <TabsTrigger value="shipper">Shipper</TabsTrigger>
            </TabsList>
            <TabsContent className="w-100" value="customer">
              <Card>
                <CardContent>
                  <Form {...customerSignUpForm}>
                    <form className="grid gap-6" onSubmit={customerSignUpForm.handleSubmit(onSubmit)}>
                      <FormField 
                        control={customerSignUpForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem className="grid gap-3">
                            <Label>Username</Label>
                            <FormControl>
                              <Input {...field} placeholder="Username" />
                            </FormControl>
                            {/* <p>{field.value?.length}/30</p> */}
                            <FormMessage/>
                          </FormItem>
                        )}
                      />
                      <FormField 
                        control={customerSignUpForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="grid gap-3">
                            <Label>Password</Label>
                            <Popover>
                              <PopoverTrigger>
                                <FormControl>
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
                        control={customerSignUpForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="grid gap-3">
                            <Label>Name</Label>
                            <FormControl>
                              <Input {...field} placeholder="Name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField 
                        control={customerSignUpForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="grid gap-3">
                            <Label>Address</Label>
                            <FormControl>
                              <Input {...field} placeholder="Address" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-username">Profile Picture</Label>
                        <ProfilePictureInput />
                      </div>
                      <Button
                        // disabled={!customerSignUpForm.formState.isValid}
                        type="submit" 
                        className="tracking-tight rounded-full gap-6 mx-auto"
                      >
                        Confirm
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="vendor"></TabsContent>
            <TabsContent value="shipper"></TabsContent>
          </Tabs>
        </div>
      </main>
  </div>
  )
}