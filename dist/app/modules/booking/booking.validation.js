"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidations = void 0;
const zod_1 = require("zod");
const facilities_constant_1 = require("../facilities/facilities.constant");
const timeStringSchema = zod_1.z.string().refine(time => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
}, {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
});
const createBookingZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        facility: zod_1.z.string(),
        date: zod_1.z.string(),
        days: zod_1.z.array(zod_1.z.enum([...facilities_constant_1.Days])).optional(),
        startTime: timeStringSchema,
        endTime: timeStringSchema,
    })
        .refine(body => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
    }, {
        message: 'Start time should be before End time !  ',
    }),
});
const updateBookingZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        facility: zod_1.z.string().optional(),
        date: zod_1.z.string().optional(),
        days: zod_1.z.array(zod_1.z.enum([...facilities_constant_1.Days])).optional(),
        startTime: timeStringSchema.optional(),
        endTime: timeStringSchema.optional(),
    })
        .refine(body => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
    }, {
        message: 'Start time should be before End time !  ',
    }),
});
exports.BookingValidations = {
    createBookingZodSchema,
    updateBookingZodSchema,
};
