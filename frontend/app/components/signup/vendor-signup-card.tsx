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
import { isBusinessAddressTaken, isBusinessNameTaken, isUsernameTaken } from "~/lib/validations";

const vendorSignUpFormSchema = z.object({
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
  businessName: z
    .string({message: "Please enter the name of your business."})
    .min(8, {message: "Name must be at least 8 characters"})
    .refine(
      async (businessName) => !(await isBusinessNameTaken(businessName))
    ),
  businessAddress: z
    .string({message: "Please enter address."})
    .refine(
      async (businessAddress) => !(await isBusinessAddressTaken(businessAddress))
    ),
})

async function onSubmit(values: z.infer<typeof vendorSignUpFormSchema>) {
  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
        role: 'vendor',
        businessName: values.businessName,
        businessAddress: values.businessAddress,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || 'Registration failed');
    console.log('Registered:', data);
  } catch (err) {
    console.error(err);
  }
}

export default function VendorSignUpCard() {
  const vendorSignUpForm = useForm<z.infer<typeof vendorSignUpFormSchema>>({
    resolver: zodResolver(vendorSignUpFormSchema),
  });
  const [avatarURL, setAvatarURL] = useState("");
  const [croppedImgURL, setCroppedImgURL] = useState("");
  const validForm = Boolean(croppedImgURL ? croppedImgURL : avatarURL) && vendorSignUpForm.formState.isValid;
  const usernameTrigger = useDebouncedCallback(() => vendorSignUpForm.trigger("username"), 500);
  const passwordTrigger = useDebouncedCallback(() => vendorSignUpForm.trigger("password"), 500);
  const businessNameTrigger = useDebouncedCallback(() => vendorSignUpForm.trigger("businessName"), 500);
  const businessAddressTrigger = useDebouncedCallback(() => vendorSignUpForm.trigger("businessAddress"), 800);

  return (
    <Card>
      <CardContent>
        <Form {...vendorSignUpForm}>
          <form className="grid gap-6" onSubmit={vendorSignUpForm.handleSubmit(onSubmit)}>
            <FormField 
              control={vendorSignUpForm.control}
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
              control={vendorSignUpForm.control}
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
              control={vendorSignUpForm.control}
              name="businessName"
              render={({ field }) => (
                <FormItem className="grid gap-3">
                  <Label>Business Name</Label>
                  <FormControl
                    onChange={businessNameTrigger}
                  >
                    <Input {...field} placeholder="Business Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={vendorSignUpForm.control}
              name="businessAddress"
              render={({ field }) => (
                <FormItem className="grid gap-3">
                  <Label>Business Address</Label>
                  <FormControl
                    onChange={businessAddressTrigger}
                  >
                    <Input {...field} placeholder="Business Address" />
                  </FormControl>
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