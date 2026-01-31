import { z } from "zod";

const createFacilityValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Facility name is required",
      })
      .min(1, "Facility name cannot be empty"),
    description: z
      .string({
        required_error: "Description is required",
      })
      .min(1, "Description cannot be empty"),
    pricePerHour: z
      .number({
        required_error: "Price per hour is required",
      })
      .positive("Price must be a positive number"),
    location: z
      .string({
        required_error: "Location is required",
      })
      .min(1, "Location cannot be empty"),
    image: z.string().url("Image must be a valid URL").optional(),
  }),
});

const updateFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Facility name cannot be empty").optional(),
    description: z.string().min(1, "Description cannot be empty").optional(),
    pricePerHour: z
      .number()
      .positive("Price must be a positive number")
      .optional(),
    location: z.string().min(1, "Location cannot be empty").optional(),
    image: z.string().url("Image must be a valid URL").optional(),
  }),
});

export const FacilityValidation = {
  createFacilityValidationSchema,
  updateFacilityValidationSchema,
};
