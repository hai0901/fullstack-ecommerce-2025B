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
import axios from "axios"; 
import { useMutation, useQuery } from '@tanstack/react-query'

export async function getPassword(username: string) {
  const result = await axios.get("https://qrandom.io/api/random/string");
  console.log("result from getPassword(): ", result);
  return result;
}

export default function EditPassword({ user, dispatch }: { user: User, dispatch: AppDispatch }) {
  const password = useQuery({ 
    queryKey: ['password'], 
    queryFn: () => getPassword(user.username as string) 
  });
  const customerForm = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
    mode: "onChange",
    defaultValues: {
      password: user.address as string
    }
  });
  const mutation = useMutation({
    mutationFn: (newPassword: string) => {
      return axios.post("new password", newPassword);
    },
  });
  const onSubmit = (values: z.infer<typeof customerFormSchema>) => {
    mutation.mutate(values.password);
  }
  const invalidForm = customerForm.watch("password") === user.address || customerForm.getFieldState("address", customerForm.formState).invalid; 

  return (
    <div className="flex p-6 pb-10 gap-6">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl tracking-tight">Password</h2>
        <div className="flex flex-col gap-3 font-light text-sm text-muted-foreground">
          <p className="font-light">This is your password. Follow our password requirements to secure your account.</p>
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
                <Button disabled={invalidForm} type="submit" variant="outline">Save</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}