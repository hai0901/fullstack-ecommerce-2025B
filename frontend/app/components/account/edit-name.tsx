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
import { useDebouncedCallback } from "use-debounce";

export default function EditNameCard({ user, dispatch }: { user: User, dispatch: AppDispatch }) {
  const customerForm = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: user.name as string
    }
  });
  const invalidForm = customerForm.getValues("name") === user.name || customerForm.getFieldState("name").invalid;
  const onSubmit = () => {
    console.log();
  }

  return (
    <div className="flex p-6 pb-10 gap-6">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl tracking-tight">Name</h2>
        <div className="flex flex-col gap-3 font-light text-sm text-muted-foreground">
          <p className="font-light">Please enter your full name, or a display name you are comfortable with.</p>
          <div className="flex gap-3 w-full">
            <Form {...customerForm}>
              <form onSubmit={customerForm.handleSubmit(onSubmit)}>
                <FormField 
                  control={customerForm.control}
                  name="name"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger>
                        <FormControl
                          onChange={() => customerForm.trigger("name")}
                        >
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
                          <p className="text-xs text-muted-foreground">
                            Minimum length: 5 characters
                          </p>
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