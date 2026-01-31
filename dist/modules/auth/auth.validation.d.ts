import { z } from "zod";
export declare const AuthValidation: {
    signupValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            name: z.ZodString;
            email: z.ZodString;
            password: z.ZodString;
            phone: z.ZodString;
            address: z.ZodString;
            role: z.ZodOptional<z.ZodEnum<["admin", "user"]>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            email: string;
            password: string;
            phone: string;
            address: string;
            role?: "admin" | "user" | undefined;
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
            role?: "admin" | "user" | undefined;
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
    loginValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            email: z.ZodString;
            password: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            email: string;
            password: string;
        }, {
            email: string;
            password: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        body: {
            email: string;
            password: string;
        };
    }, {
        body: {
            email: string;
            password: string;
        };
    }>;
    changePasswordValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            oldPassword: z.ZodString;
            newPassword: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            oldPassword: string;
            newPassword: string;
        }, {
            oldPassword: string;
            newPassword: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        body: {
            oldPassword: string;
            newPassword: string;
        };
    }, {
        body: {
            oldPassword: string;
            newPassword: string;
        };
    }>;
};
//# sourceMappingURL=auth.validation.d.ts.map