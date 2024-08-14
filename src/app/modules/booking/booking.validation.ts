import { Types } from 'mongoose';
import { z } from 'zod';
import { Days } from '../facilities/facilities.constant';

const timeStringSchema = z.string().refine(
  time => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  },
);

const createBookingZodSchema = z.object({
  body: z
    .object({
      facility: z.string(),
      date: z.string(),
      days: z.array(z.enum([...Days] as [string, ...string[]])).optional(),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      body => {

        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
      },
      {
        message: 'Start time should be before End time !  ',
      },
    ),
});

const updateBookingZodSchema = z.object({
  body: z
    .object({
      facility: z.string().optional(),
      date: z.string().optional(),
      days: z.array(z.enum([...Days] as [string, ...string[]])).optional(),
      startTime: timeStringSchema.optional(),
      endTime: timeStringSchema.optional(),
    })
    .refine(
      body => {

        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
      },
      {
        message: 'Start time should be before End time !  ',
      },
    ),
});

export const BookingValidations = {
  createBookingZodSchema,
  updateBookingZodSchema,
};
