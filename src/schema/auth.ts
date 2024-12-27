import { z } from "zod";

// Define the zod schema
export const signUpSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" })
    .trim(),
  password: z.string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(50, { message: "Password must not exceed 50 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must not exceed 50 characters" })
    .trim()
    .optional(),
});

// Infer the type from schema
export type SignUpBody = z.infer<typeof signUpSchema>;
