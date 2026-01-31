import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(1, "Name cannot be empty"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email format"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password must be at least 6 characters long"),
    phone: z
      .string({
        required_error: "Phone number is required",
      })
      .min(1, "Phone number cannot be empty"),
    role: z.enum(["admin", "user"]).default("user"),
    address: z
      .string({
        required_error: "Address is required",
      })
      .min(1, "Address cannot be empty"),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name cannot be empty").optional(),
    phone: z.string().min(1, "Phone number cannot be empty").optional(),
    address: z.string().min(1, "Address cannot be empty").optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
