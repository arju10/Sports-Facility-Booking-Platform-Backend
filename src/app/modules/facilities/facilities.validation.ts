import { z } from 'zod';

const timeStringSchema = z.string().refine(
  time => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  {
    message: 'Invalid time format, expected "HH:MM" in 24 hours format',
  },
);

const createFacilityValidationSchema = z.object({
  body: z
    .object({
      name: z.string(),
      description: z.string(),
      pricePerHour: z.number(),
      location: z.string(),
      startTime: timeStringSchema.optional(),
      endTime: timeStringSchema.optional(),
      isDeleted: z.boolean().optional(),
    })
    .refine(
      body => {
        if (body.startTime && body.endTime) {
          const start = new Date(`1970-01-01T${body.startTime}:00`);
          const end = new Date(`1970-01-01T${body.endTime}:00`);
          return end > start;
        }
        return true;
      },
      {
        message: 'Start time should be before End time!',
      },
    ),
});

const updateFacilityValidationSchema = z.object({
  body: z
    .object({
      name: z.string().optional(),
      description: z.string().optional(),
      pricePerHour: z.number().optional(),
      location: z.string().optional(),
      startTime: timeStringSchema.optional(),
      endTime: timeStringSchema.optional(),
      isDeleted: z.boolean().optional(),
    })
    .refine(
      body => {
        if (body.startTime && body.endTime) {
          const start = new Date(`1970-01-01T${body.startTime}:00`);
          const end = new Date(`1970-01-01T${body.endTime}:00`);
          return end > start;
        }
        return true;
      },
      {
        message: 'Start time should be before End time!',
      },
    ),
});

export const FacilityValidations = {
  createFacilityValidationSchema,
  updateFacilityValidationSchema,
};
