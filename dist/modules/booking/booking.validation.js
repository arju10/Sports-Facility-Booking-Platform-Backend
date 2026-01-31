"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const createBookingValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        facility: zod_1.z
            .string({
            required_error: "Facility ID is required",
        })
            .regex(/^[0-9a-fA-F]{24}$/, "Invalid facility ID"),
        date: zod_1.z
            .string({
            required_error: "Date is required",
        })
            .regex(dateRegex, "Date must be in YYYY-MM-DD format"),
        startTime: zod_1.z
            .string({
            required_error: "Start time is required",
        })
            .regex(timeRegex, "Start time must be in HH:MM format (24-hour)"),
        endTime: zod_1.z
            .string({
            required_error: "End time is required",
        })
            .regex(timeRegex, "End time must be in HH:MM format (24-hour)"),
    })
        .refine((data) => {
        const [startHour, startMinute] = data.startTime.split(":").map(Number);
        const [endHour, endMinute] = data.endTime.split(":").map(Number);
        const startTotal = startHour * 60 + startMinute;
        const endTotal = endHour * 60 + endMinute;
        return endTotal > startTotal;
    }, {
        message: "End time must be after start time",
        path: ["endTime"],
    }),
});
const checkAvailabilityValidationSchema = zod_1.z.object({
    query: zod_1.z.object({
        date: zod_1.z
            .string({
            required_error: "Date is required",
        })
            .regex(dateRegex, "Date must be in YYYY-MM-DD format"),
        facility: zod_1.z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/, "Invalid facility ID")
            .optional(),
    }),
});
exports.BookingValidation = {
    createBookingValidationSchema,
    checkAvailabilityValidationSchema,
};
//# sourceMappingURL=booking.validation.js.map