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

export default function EditAddressCard({ user, dispatch }: { user: User, dispatch: AppDispatch }) {
  const [isLoading, setIsLoading] = useState(false);
  
  const customerForm = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
    mode: "onChange",
    defaultValues: {
      address: user.address as string
    }
  });
  
  const onSubmit = async (values: z.infer<typeof customerFormSchema>) => {
    try {
      setIsLoading(true);
      
      // Prepare update data based on user role
      const updateData: any = {};
      if (user.role === 'customer') {
        updateData.address = values.address;
      } else if (user.role === 'vendor') {
        updateData.businessAddress = values.address;
      }
      
      const response = await api.put('/auth/profile', updateData);
      
      // Update Redux state with backend response
      dispatch({
        type: 'auth/updateUser',
        payload: response.data.user
      });
      
      toast.success('Address updated successfully');
    } catch (error: any) {
      console.error('Error updating address:', error);
      toast.error(error.response?.data?.error || 'Failed to update address');
    } finally {
      setIsLoading(false);
    }
  };
  
  const invalidForm = customerForm.watch("address") === user.address || customerForm.getFieldState("address", customerForm.formState).invalid; 

  return (
    <div className="flex p-6 pb-10 gap-6">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl tracking-tight">Address</h2>
        <div className="flex flex-col gap-3 font-light text-sm text-muted-foreground">
          <p className="font-light">This is your address.</p>
          <div className="flex gap-3 w-full">
            <Form {...customerForm}>
              <form onSubmit={customerForm.handleSubmit(onSubmit)}>
                <FormField 
                  control={customerForm.control}
                  name="address"
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
                              Length: 2 characters minimum.
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