"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityValidations = void 0;
const zod_1 = require("zod");
const timeStringSchema = zod_1.z.string().refine(time => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
}, {
    message: 'Invalid time format, expected "HH:MM" in 24 hours format',
});
const createFacilityValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        pricePerHour: zod_1.z.number(),
        location: zod_1.z.string(),
        startTime: timeStringSchema.optional(),
        endTime: timeStringSchema.optional(),
        isDeleted: zod_1.z.boolean().optional(),
    })
        .refine(body => {
        if (body.startTime && body.endTime) {
            const start = new Date(`1970-01-01T${body.startTime}:00`);
            const end = new Date(`1970-01-01T${body.endTime}:00`);
            return end > start;
        }
        return true;
    }, {
        message: 'Start time should be before End time!',
    }),
});
const updateFacilityValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        pricePerHour: zod_1.z.number().optional(),
        location: zod_1.z.string().optional(),
        startTime: timeStringSchema.optional(),
        endTime: timeStringSchema.optional(),
        isDeleted: zod_1.z.boolean().optional(),
    })
        .refine(body => {
        if (body.startTime && body.endTime) {
            const start = new Date(`1970-01-01T${body.startTime}:00`);
            const end = new Date(`1970-01-01T${body.endTime}:00`);
            return end > start;
        }
        return true;
    }, {
        message: 'Start time should be before End time!',
    }),
});
exports.FacilityValidations = {
    createFacilityValidationSchema,
    updateFacilityValidationSchema,
};
