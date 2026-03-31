import z from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string("Please enter a password")
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
  // .regex(
  //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
  //   "Password must contain at least one letter and one number",
  // )
  // .regex(/^[^\s]+$/, "Password cannot contain spaces")
  // .regex(/^[\x20-\x7E]+$/, "Password cannot contain special characters"),
});

export const registerSchema = z.object({
  name: z.string("Please enter your name").min(1, "Name is required"),
  email: z.email("Please enter a valid email address"),
  password: z
    .string("Please enter a password")
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
      "Password must contain at least one letter and one number",
    )
    .regex(/^[^\s]+$/, "Password cannot contain spaces")
    .regex(/^[\x20-\x7E]+$/, "Password cannot contain special characters"),
});
