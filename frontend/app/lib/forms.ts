import { useForm } from "react-hook-form";
import { customerFormSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";

export const customerForm = useForm<z.infer<typeof customerFormSchema>>({
  resolver: zodResolver(customerFormSchema),
});