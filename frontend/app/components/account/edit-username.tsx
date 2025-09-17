/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

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

export default function EditUsermameCard({ user, dispatch }: { user: User, dispatch: AppDispatch }) {
  const [isLoading, setIsLoading] = useState(false);
  
  const customerForm = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
    mode: "onChange",
    defaultValues: {
      username: user.username as string
    }
  });
  
  const onSubmit = async (values: z.infer<typeof customerFormSchema>) => {
    try {
      setIsLoading(true);
      
      const response = await api.put('/auth/username', {
        newUsername: values.username
      });
      
      // Update Redux state with backend response
      dispatch({
        type: 'auth/updateUser',
        payload: response.data.user
      });
      
      toast.success('Username updated successfully');
    } catch (error: any) {
      console.error('Error updating username:', error);
      toast.error(error.response?.data?.error || 'Failed to update username');
    } finally {
      setIsLoading(false);
    }
  };
  
  const invalidForm = customerForm.watch("username") === user.username || customerForm.getFieldState("username", customerForm.formState).invalid; 

  return (
    <div className="flex p-6 pb-10 gap-6">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl tracking-tight">Username</h2>
        <div className="flex flex-col gap-3 font-light text-sm text-muted-foreground">
          <p className="font-light">This is the name you use for signing in. All usernames in our system are unique.</p>
          <div className="flex gap-3 w-full">
            <Form {...customerForm}>
              <form onSubmit={customerForm.handleSubmit(onSubmit)}>
                <FormField 
                  control={customerForm.control}
                  name="username"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger>
                        <FormControl>
                          <Input 
                            className="text-white"
                            {...field}
                          />
                        </FormControl>
                      </PopoverTrigger>
                        <PopoverContent
                          onOpenAutoFocus={(e) => e.preventDefault()}
                          className="w-full"
                          sideOffset={10}
                        >
                          <ol className="text-xs text-muted-foreground">
                            <li>
                              Allowed characters: letters and digits.
                            </li>
                            <li>
                              Length: 8-15 characters.
                            </li>
                          </ol>
                        </PopoverContent>
                    </Popover>
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