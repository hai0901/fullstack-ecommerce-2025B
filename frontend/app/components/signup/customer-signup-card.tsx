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
import { customerFormSchema } from "~/lib/schemas";

function onSubmit(values: z.infer<typeof customerFormSchema>) {
  console.log(values)
}

export default function CustomerSignUpCard() {
  const customerSignUpForm = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
  });
  const [avatarURL, setAvatarURL] = useState("");
  const [croppedImgURL, setCroppedImgURL] = useState("");
  const validForm = Boolean(croppedImgURL ? croppedImgURL : avatarURL) && customerSignUpForm.formState.isValid;
  const usernameTrigger = useDebouncedCallback(() => customerSignUpForm.trigger("username"), 500);
  const passwordTrigger = useDebouncedCallback(() => customerSignUpForm.trigger("password"), 500);
  const nameTrigger = useDebouncedCallback(() => customerSignUpForm.trigger("name"), 500);
  const addressTrigger = useDebouncedCallback(() => customerSignUpForm.trigger("address"), 800);

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