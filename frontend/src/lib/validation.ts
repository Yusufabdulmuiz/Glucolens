import { z } from "zod";

/**
 * Login Schema
 * Enforces email format and password presence.
 */
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

/**
 * Registration Schema
 * Enforces strong password policies, matching confirmation, and handles new phone/consent fields.
 */
export const registerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(5, "Please enter a valid phone number"), // Added Phone Number
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  // Added Consent Checkboxes (optional, default to false if unchecked)
  emailReminders: z.boolean().optional(),
  smsReminders: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Type inference for usage in components
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
