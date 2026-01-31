import { z } from "zod";
export declare const UserValidation: {
    createUserValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            name: z.ZodString;
            email: z.ZodString;
            password: z.ZodString;
            phone: z.ZodString;
            role: z.ZodDefault<z.ZodEnum<["admin", "user"]>>;
            address: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            email: string;
            password: string;
            phone: string;
            address: string;
            role: "admin" | "user";
        }, {
            name: string;
            email: string;
            password: string;
            phone: string;
            address: string;
            role?: "admin" | "user" | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        body: {
            name: string;
            email: string;
            password: string;
            phone: string;
            address: string;
            role: "admin" | "user";
        };
    }, {
        body: {
            name: string;
            email: string;
            password: string;
            phone: string;
            address: string;
            role?: "admin" | "user" | undefined;
        };
    }>;
    updateUserValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            phone: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            phone?: string | undefined;
            address?: string | undefined;
        }, {
            name?: string | undefined;
            phone?: string | undefined;
            address?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        body: {
            name?: string | undefined;
            phone?: string | undefined;
            address?: string | undefined;
        };
    }, {
        body: {
            name?: string | undefined;
            phone?: string | undefined;
            address?: string | undefined;
        };
    }>;
};
//# sourceMappingURL=user.validation.d.ts.map