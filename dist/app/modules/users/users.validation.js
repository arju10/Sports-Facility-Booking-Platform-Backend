"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = exports.createUserZodValidationSchema = void 0;
const zod_1 = require("zod");
exports.createUserZodValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        email: zod_1.z.string().email('Invalid email format'),
        password: zod_1.z.string().min(8, 'Password must be at least 8 characters long'),
        needsPasswordChange: zod_1.z.boolean().optional(),
        passwordChangedAt: zod_1.z.date().optional(),
        phone: zod_1.z.string().min(10, 'Phone number must be at least 10 digits long'),
        role: zod_1.z.enum(['user', 'admin']).default('user'),
        address: zod_1.z.string().min(1, 'Address is required'),
    }),
});
exports.UserValidations = {
    createUserZodValidationSchema: exports.createUserZodValidationSchema,
};
