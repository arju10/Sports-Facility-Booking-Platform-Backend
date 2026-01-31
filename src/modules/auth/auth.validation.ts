import { z } from "zod";

const signupValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email format"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password must be at least 6 characters"),
    phone: z.string({
      required_error: "Phone number is required",
    }),
    address: z.string({
      required_error: "Address is required",
    }),
    role: z.enum(["admin", "user"]).optional(),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email format"),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: "Old password is required",
    }),
    newPassword: z
      .string({
        required_error: "New password is required",
      })
      .min(6, "New password must be at least 6 characters"),
  }),
});

export const AuthValidation = {
  signupValidationSchema,
  loginValidationSchema,
  changePasswordValidationSchema,
};
