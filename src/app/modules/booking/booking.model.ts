import { Schema, model } from 'mongoose';
import { TBookings } from './booking.interface';
import { Facility } from '../facilities/facilities.model';

const bookingSchema = new Schema<TBookings>(
  {
    date: { type: String },
    days: [
      {
        type: String,
        enum: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        required: true,
      },
    ],
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    facility: { type: Schema.Types.ObjectId, ref: 'Facility', required: true },
    payableAmount: { type: Number },
    isBooked: {
      type: String,
      enum: ['confirmed', 'unconfirmed', 'canceled'],
      default: 'unconfirmed',
    },
  },
  {
    timestamps: true,
  },
);

// Pre-save hook to calculate payableAmount
bookingSchema.pre('save', async function (next) {
  const booking = this as TBookings;

  // Fetch the facility to get the price per hour
  const facility = await Facility.findById(booking.facility);
  if (!facility) {
    return next(new Error('Facility not found'));
  }

  // Convert startTime and endTime to Date objects
  const startDateTime = new Date(`${booking.date}T${booking.startTime}:00`);
  const endDateTime = new Date(`${booking.date}T${booking.endTime}:00`);

  // Calculate duration in hours
  const durationInHours =
    (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);

  // Calculate payableAmount
  booking.payableAmount = durationInHours * facility.pricePerHour;

  next();
});

export const Booking = model<TBookings>('Booking', bookingSchema);
