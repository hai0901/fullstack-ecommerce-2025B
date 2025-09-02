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
})

function onSubmit(values: z.infer<typeof customerSignUpFormSchema>) {
  console.log(values)
}

export default function CustomerSignUpCard() {
  const customerSignUpForm = useForm<z.infer<typeof customerSignUpFormSchema>>({
    resolver: zodResolver(customerSignUpFormSchema),
  });
  const [avatarURL, setAvatarURL] = useState("");
  const [croppedImgURL, setCroppedImgURL] = useState("");
  const validForm = Boolean(croppedImgURL ? croppedImgURL : avatarURL) && customerSignUpForm.formState.isValid;

  const usernameTrigger = useDebouncedCallback(() => customerSignUpForm.trigger("username"), 500);
  const passwordTrigger = useDebouncedCallback(() => customerSignUpForm.trigger("password"), 500);
  const nameTrigger = useDebouncedCallback(() => customerSignUpForm.trigger("name"), 500);
  const addressTrigger = useDebouncedCallback(() => customerSignUpForm.trigger("address"), 500);

  return (
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
              control={customerSignUpForm.control}
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
              control={customerSignUpForm.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid gap-3">
                  <Label>Name</Label>
                  <FormControl
                    onChange={nameTrigger}
                  >
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
                  <FormControl
                    onChange={addressTrigger}
                  >
                    <Input {...field} placeholder="Address" />
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
              disabled={!validForm}
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

//Username is validated in a debounced manner. 