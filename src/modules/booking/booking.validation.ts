import { z } from "zod";

const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const createBookingValidationSchema = z.object({
  body: z
    .object({
      facility: z
        .string({
          required_error: "Facility ID is required",
        })
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid facility ID"),
      date: z
        .string({
          required_error: "Date is required",
        })
        .regex(dateRegex, "Date must be in YYYY-MM-DD format"),
      startTime: z
        .string({
          required_error: "Start time is required",
        })
        .regex(timeRegex, "Start time must be in HH:MM format (24-hour)"),
      endTime: z
        .string({
          required_error: "End time is required",
        })
        .regex(timeRegex, "End time must be in HH:MM format (24-hour)"),
    })
    .refine(
      (data) => {
        const [startHour, startMinute] = data.startTime.split(":").map(Number);
        const [endHour, endMinute] = data.endTime.split(":").map(Number);
        const startTotal = startHour * 60 + startMinute;
        const endTotal = endHour * 60 + endMinute;
        return endTotal > startTotal;
      },
      {
        message: "End time must be after start time",
        path: ["endTime"],
      },
    ),
});

const checkAvailabilityValidationSchema = z.object({
  query: z.object({
    date: z
      .string({
        required_error: "Date is required",
      })
      .regex(dateRegex, "Date must be in YYYY-MM-DD format"),
    facility: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid facility ID")
      .optional(),
  }),
});

export const BookingValidation = {
  createBookingValidationSchema,
  checkAvailabilityValidationSchema,
};
