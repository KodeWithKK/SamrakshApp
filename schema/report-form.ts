import { z } from "zod";

export const reportFormSchema = z.object({
  fullname: z.string().min(1, "Name is required").max(100, "Name is too long"),
  gender: z
    .string()
    .min(1, "Gender is required")
    .max(50, "Gender input is too long"),
  age: z
    .string()
    .min(1, "Age is required")
    .regex(/^\d+$/, "Age must be a number")
    .refine((val) => parseInt(val) >= 0 && parseInt(val) <= 150, {
      message: "Age must be between 0 and 150",
    }),
  describe_appearance: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description is too long"),
  last_seen_location: z
    .string()
    .min(5, "Location must be at least 5 characters")
    .max(200, "Location is too long"),
  follow_up_name: z
    .string()
    .min(2, "Contact name must be at least 2 characters")
    .max(100, "Contact name is too long"),
  follow_up_phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{10}$/, "Phone must be exactly 10 digits"),
  follow_up_email: z
    .string()
    .min(1, "Email is Required")
    .email("Invalid Email"),
  follow_up_address: z
    .string()
    .min(1, "Address is Required")
    .max(200, "Address is too long"),
  file: z
    .object({
      uri: z.string(),
      name: z.string(),
      mimeType: z.string().optional(),
    })
    .optional(),
});

export type IReportForm = z.infer<typeof reportFormSchema>;
