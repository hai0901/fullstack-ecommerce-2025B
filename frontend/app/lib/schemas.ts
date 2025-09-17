/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

import z from "zod";
import { isUsernameTaken } from "~/lib/validations";

export const customerFormSchema = z.object({
  username: z
    .string({message: "Please enter username."})
    .min(8, {message: "Username must be at least 8 characters."})
    .max(15, {message: "Username must be at most 15 characters."})
    .regex(/^[a-zA-Z0-9]+$/, {message: "Only letters and numbers are allowed."})
    .refine(
      async (username) => !(await isUsernameTaken(username)),
      { message: "This username is already taken" }
    )
  ,
  password: z
    .string({message: "Please enter password."})
    .min(8, {message: "Password must be at least 8 characters."})
    .max(20, {message: "Password must be at most 20 characters."})
    .regex(/[a-z]/, {message: "Password must contain at least one lowercase letter"})
    .regex(/[A-Z]/, {message: "Password must contain at least one uppercase letter"})
    .regex(/[0-9]/, {message: "Password must contain at least one number"})
    .regex(/[^a-zA-Z0-9]/, {message: "Password must contain at least one special character"})
  ,
  name: z
    .string({message: "Please enter your name."})
    .min(5, {message: "Name must be at least 5 characters"}),
  address: z
    .string({message: "Please enter address."})
    .min(5, {message: "Address must be at least 5 characters"}),
});