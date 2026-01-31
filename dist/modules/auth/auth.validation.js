"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const signupValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email("Invalid email format"),
        password: zod_1.z
            .string({
            required_error: "Password is required",
        })
            .min(6, "Password must be at least 6 characters"),
        phone: zod_1.z.string({
            required_error: "Phone number is required",
        }),
        address: zod_1.z.string({
            required_error: "Address is required",
        }),
        role: zod_1.z.enum(["admin", "user"]).optional(),
    }),
});
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email("Invalid email format"),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
    }),
});
const changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            required_error: "Old password is required",
        }),
        newPassword: zod_1.z
            .string({
            required_error: "New password is required",
        })
            .min(6, "New password must be at least 6 characters"),
    }),
});
exports.AuthValidation = {
    signupValidationSchema,
    loginValidationSchema,
    changePasswordValidationSchema,
};
//# sourceMappingURL=auth.validation.js.map