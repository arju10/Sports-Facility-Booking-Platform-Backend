// import { z } from 'zod';
// import { Days } from './facilities.constant';

// const timeStringSchema = z.string().refine(
//   time => {
//     const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
//     return regex.test(time);
//   },
//   {
//     message: 'Invalid time format , expected "HH:MM" in 24 hours format',
//   },
// );

// const createFacilityValidationSchema = z.object({
//   body: z
//     .object({
//       name: z.string(),
//       description: z.string(),
//       pricePerHour: z.number(),
//       location: z.string(),
//       // days: z.array(z.enum([...Days] as [string, ...string[]])),
//       startTime: timeStringSchema.optional(),
//       endTime: timeStringSchema.optional(),
//       isDeleted: z.boolean().optional(),
//     })
//     .refine(
//       body => {
//         // startTime : 10:30  => 1970-01-01T10:30
//         //endTime : 12:30  =>  1970-01-01T12:30

//         const start = new Date(`1970-01-01T${body.startTime}:00`);
//         const end = new Date(`1970-01-01T${body.endTime}:00`);

//         return end > start;
//       },
//       {
//         message: 'Start time should be before End time !  ',
//       },
//     ),
// });

// const updateFacilityValidationSchema = z.object({
//   body: z
//     .object({
//       name: z.string().optional(),
//       description: z.string().optional(),
//       pricePerHour: z.number().optional(),
//       location: z.string().optional(),
//       isDeleted: z.boolean().optional(),
//       // days: z.array(z.enum([...Days] as [string, ...string[]])),
//       startTime: timeStringSchema.optional(), // HH: MM   00-23: 00-59
//       endTime: timeStringSchema.optional(),
//     })
//     .refine(
//       body => {
//         // startTime : 10:30  => 1970-01-01T10:30
//         //endTime : 12:30  =>  1970-01-01T12:30

//         const start = new Date(`1970-01-01T${body.startTime}:00`);
//         const end = new Date(`1970-01-01T${body.endTime}:00`);

//         return end > start;
//       },
//       {
//         message: 'Start time should be before End time !  ',
//       },
//     ).optional(),
// });

// export const FacilityValidations = {
//   createFacilityValidationSchema,
//   updateFacilityValidationSchema,
// };


// 2nd -> Not working Update
import { z } from 'zod';
import { Days } from './facilities.constant';

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

