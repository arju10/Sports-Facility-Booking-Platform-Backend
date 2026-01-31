import { z } from "zod";
export declare const FacilityValidation: {
    createFacilityValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            name: z.ZodString;
            description: z.ZodString;
            pricePerHour: z.ZodNumber;
            location: z.ZodString;
            image: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            description: string;
            pricePerHour: number;
            location: string;
            image?: string | undefined;
        }, {
            name: string;
            description: string;
            pricePerHour: number;
            location: string;
            image?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        body: {
            name: string;
            description: string;
            pricePerHour: number;
            location: string;
            image?: string | undefined;
        };
    }, {
        body: {
            name: string;
            description: string;
            pricePerHour: number;
            location: string;
            image?: string | undefined;
        };
    }>;
    updateFacilityValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            pricePerHour: z.ZodOptional<z.ZodNumber>;
            location: z.ZodOptional<z.ZodString>;
            image: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            description?: string | undefined;
            pricePerHour?: number | undefined;
            location?: string | undefined;
            image?: string | undefined;
        }, {
            name?: string | undefined;
            description?: string | undefined;
            pricePerHour?: number | undefined;
            location?: string | undefined;
            image?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        body: {
            name?: string | undefined;
            description?: string | undefined;
            pricePerHour?: number | undefined;
            location?: string | undefined;
            image?: string | undefined;
        };
    }, {
        body: {
            name?: string | undefined;
            description?: string | undefined;
            pricePerHour?: number | undefined;
            location?: string | undefined;
            image?: string | undefined;
        };
    }>;
};
//# sourceMappingURL=facility.validation.d.ts.map