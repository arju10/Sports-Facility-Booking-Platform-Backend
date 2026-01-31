"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityValidation = void 0;
const zod_1 = require("zod");
const createFacilityValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Facility name is required",
        })
            .min(1, "Facility name cannot be empty"),
        description: zod_1.z
            .string({
            required_error: "Description is required",
        })
            .min(1, "Description cannot be empty"),
        pricePerHour: zod_1.z
            .number({
            required_error: "Price per hour is required",
        })
            .positive("Price must be a positive number"),
        location: zod_1.z
            .string({
            required_error: "Location is required",
        })
            .min(1, "Location cannot be empty"),
        image: zod_1.z.string().url("Image must be a valid URL").optional(),
    }),
});
const updateFacilityValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Facility name cannot be empty").optional(),
        description: zod_1.z.string().min(1, "Description cannot be empty").optional(),
        pricePerHour: zod_1.z
            .number()
            .positive("Price must be a positive number")
            .optional(),
        location: zod_1.z.string().min(1, "Location cannot be empty").optional(),
        image: zod_1.z.string().url("Image must be a valid URL").optional(),
    }),
});
exports.FacilityValidation = {
    createFacilityValidationSchema,
    updateFacilityValidationSchema,
};
//# sourceMappingURL=facility.validation.js.map