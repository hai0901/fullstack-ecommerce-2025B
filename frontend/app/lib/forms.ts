/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

import { useForm } from "react-hook-form";
import { customerFormSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";

export const customerForm = useForm<z.infer<typeof customerFormSchema>>({
  resolver: zodResolver(customerFormSchema),
});