import { z } from "zod";
export declare const BookingValidation: {
    createBookingValidationSchema: z.ZodObject<{
        body: z.ZodEffects<z.ZodObject<{
            facility: z.ZodString;
            date: z.ZodString;
            startTime: z.ZodString;
            endTime: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            date: string;
            facility: string;
            startTime: string;
            endTime: string;
        }, {
            date: string;
            facility: string;
            startTime: string;
            endTime: string;
        }>, {
            date: string;
            facility: string;
            startTime: string;
            endTime: string;
        }, {
            date: string;
            facility: string;
            startTime: string;
            endTime: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        body: {
            date: string;
            facility: string;
            startTime: string;
            endTime: string;
        };
    }, {
        body: {
            date: string;
            facility: string;
            startTime: string;
            endTime: string;
        };
    }>;
    checkAvailabilityValidationSchema: z.ZodObject<{
        query: z.ZodObject<{
            date: z.ZodString;
            facility: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            date: string;
            facility?: string | undefined;
        }, {
            date: string;
            facility?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        query: {
            date: string;
            facility?: string | undefined;
        };
    }, {
        query: {
            date: string;
            facility?: string | undefined;
        };
    }>;
};
//# sourceMappingURL=booking.validation.d.ts.map