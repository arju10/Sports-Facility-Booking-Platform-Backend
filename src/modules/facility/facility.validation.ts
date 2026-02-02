import { z } from "zod";

const createFacilityValidationSchema = z.object({
    body: z.object({
      name: z.string({
        required_error: 'Name is required',
      }),
      description: z.string({
        required_error: 'Description is required',
      }),
      pricePerHour: z.preprocess(
        (val) => (typeof val === 'string' ? parseFloat(val) : val), // Convert string to number
        z.number({
          required_error: 'Price per hour is required',
          invalid_type_error: 'Price must be a number',
        }).positive('Price must be positive')
      ),
      location: z.string({
        required_error: 'Location is required',
      }),
      image: z.string().optional(),
    }),
  })

const updateFacilityValidationSchema = z.object({
    body: z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      pricePerHour: z.preprocess(
        (val) => (typeof val === 'string' ? parseFloat(val) : val), // Convert string to number
        z.number().positive('Price must be positive')
      ).optional(),
      location: z.string().optional(),
      image: z.string().optional(),
    }),
  })

export const FacilityValidation = {
  createFacilityValidationSchema,
  updateFacilityValidationSchema,
};
