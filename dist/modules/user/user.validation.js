"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Name is required",
        })
            .min(1, "Name cannot be empty"),
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email("Invalid email format"),
        password: zod_1.z
            .string({
            required_error: "Password is required",
        })
            .min(6, "Password must be at least 6 characters long"),
        phone: zod_1.z
            .string({
            required_error: "Phone number is required",
        })
            .min(1, "Phone number cannot be empty"),
        role: zod_1.z.enum(["admin", "user"]).default("user"),
        address: zod_1.z
            .string({
            required_error: "Address is required",
        })
            .min(1, "Address cannot be empty"),
    }),
});
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name cannot be empty").optional(),
        phone: zod_1.z.string().min(1, "Phone number cannot be empty").optional(),
        address: zod_1.z.string().min(1, "Address cannot be empty").optional(),
    }),
});
exports.UserValidation = {
    createUserValidationSchema,
    updateUserValidationSchema,
};
//# sourceMappingURL=user.validation.js.map