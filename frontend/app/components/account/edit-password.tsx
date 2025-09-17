import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import type { User } from "~/features/authentication/authenticationSlice";
import type { AppDispatch } from "~/store";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { customerFormSchema } from "~/lib/schemas";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "~/utils/api";
import { toast } from "sonner";
import { useState } from "react";

// Create a schema for password update
const passwordUpdateSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string({message: "Please enter password."})
    .min(8, {message: "Password must be at least 8 characters."})
    .max(20, {message: "Password must be at most 20 characters."})
    .regex(/[a-z]/, {message: "Password must contain at least one lowercase letter"})
    .regex(/[A-Z]/, {message: "Password must contain at least one uppercase letter"})
    .regex(/[0-9]/, {message: "Password must contain at least one number"})
    .regex(/[^a-zA-Z0-9]/, {message: "Password must contain at least one special character"})
});

export default function EditPassword({ user, dispatch }: { user: User, dispatch: AppDispatch }) {
  const [isLoading, setIsLoading] = useState(false);
  
  const passwordForm = useForm<z.infer<typeof passwordUpdateSchema>>({
    resolver: zodResolver(passwordUpdateSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: ""
    }
  });
  
  const onSubmit = async (values: z.infer<typeof passwordUpdateSchema>) => {
    try {
      setIsLoading(true);
      
      await api.put('/auth/password', {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
      });
      
      // Clear form
      passwordForm.reset();
      
      toast.success('Password updated successfully');
    } catch (error: any) {
      console.error('Error updating password:', error);
      toast.error(error.response?.data?.error || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };
  
  const invalidForm = !passwordForm.formState.isValid || 
    passwordForm.watch("currentPassword") === "" || 
    passwordForm.watch("newPassword") === ""; 

  return (
    <div className="flex p-6 pb-10 gap-6">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl tracking-tight">Password</h2>
        <div className="flex flex-col gap-3 font-light text-sm text-muted-foreground">
          <p className="font-light">This is your password. Follow our password requirements to secure your account.</p>
          <div className="flex flex-col gap-3 w-full">
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                <FormField 
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          type="password"
                          placeholder="Current Password"
                          className="text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          type="password"
                          placeholder="New Password"
                          className="text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={invalidForm || isLoading} type="submit" variant="outline">
                  {isLoading ? 'Saving...' : 'Save'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}