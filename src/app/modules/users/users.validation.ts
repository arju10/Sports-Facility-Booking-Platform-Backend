import { z } from 'zod';

export const createUserZodValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    needsPasswordChange: z.boolean().optional(),
    passwordChangedAt: z.date().optional(),
    phone: z.string().min(10, 'Phone number must be at least 10 digits long'),
    role: z.enum(['user', 'admin']).default('user'),
    address: z.string().min(1, 'Address is required'),
  }),
});

export const UserValidations = {
  createUserZodValidationSchema,
};
