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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string()
})

// const form = useForm<z.infer<typeof formSchema>>({
//   resolver: zodResolver(formSchema),
//   defaultValues: {
//     username: "",
//     password: ""
//   },
// })

export default function SignUpPage() {
  const [avatarURL, setAvatarURL] = useState<string>("");
  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        setAvatarURL(binaryStr);
      }
      reader.readAsDataURL(file)
    })
  }, []);
  const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({onDrop})

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
        <h2 className="font-normal tracking-tight">Create your new account as</h2>
        <div className="flex w-200 flex-col items-center gap-6">
          <Tabs defaultValue="customer">
            <TabsList>
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="vendor">Vendor</TabsTrigger>
              <TabsTrigger value="shipper">Shipper</TabsTrigger>
            </TabsList>
            <TabsContent className="w-100" value="customer">
              <Card>
                <CardHeader>
                  <CardTitle>Customer</CardTitle>
                  <CardDescription>Sign up now to not miss any good deal from Neomall.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-name">Username</Label>
                    <Input placeholder="Username" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-username">Password</Label>
                    <Input placeholder="Password" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-username">Name</Label>
                    <Input placeholder="Name" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-username">Address</Label>
                    <Input placeholder="Address" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-username">Profile Picture</Label>
                    {avatarURL ?
                      <div className="flex place-content-center">
                        <Avatar className="w-30 h-30 outline">
                          <AvatarImage src={avatarURL} alt="avatar"/>
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>
                      : 
                      <div 
                        className={cn("transition duration-150 flex flex-col items-center justify-center rounded-lg text-sm font-light w-full h-50 border text-muted-foreground cursor-pointer gap-3", isDragActive && "border-white")}
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        <ImageUp size={32} color={isDragActive ? "white" : undefined} strokeWidth={1.5} className="transition duration-150" />
                        {!isDragActive &&
                          <>
                            <p>Click to select an image to upload</p>
                            <p>or</p>
                            <p>Drag your chosen image here.</p>
                          </>
                        }
                      </div>
                    }
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="tracking-tight rounded-full gap-6">Confirm</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="vendor"></TabsContent>
            <TabsContent value="shipper"></TabsContent>
          </Tabs>
        </div>
        {/* <Form {...form}>
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
        <p className="text-sm tracking-tight font-light">
          Don't have an account?
          <Link to="/signup">
            <Button className="text-md font-normal cursor-pointer" variant="link">Sign Up</Button>
          </Link>
        </p> */}
      </main>
  </div>
  )
}

import { AppWindowIcon, CodeIcon, ImageUp } from "lucide-react"
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";



export function TabsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Name</Label>
                <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Username</Label>
                <Input id="tabs-demo-username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
