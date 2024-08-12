import { z } from 'zod';

const createFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    pricePerHour: z.number(),
    location: z.string(),
    isDeleted: z.boolean().optional(),
  }),
});

export const FacilityValidations = {
  createFacilityValidationSchema,
};
