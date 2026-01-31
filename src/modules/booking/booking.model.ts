import { Schema, model } from "mongoose";
import { IBooking } from "./booking.interface";
import { Facility } from "../facility/facility.model";

const bookingSchema = new Schema<IBooking>(
  {
    facility: {
      type: Schema.Types.ObjectId,
      ref: "Facility",
      required: [true, "Facility is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    date: {
      type: String,
      required: [true, "Date is required"],
      match: [/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"],
    },
    startTime: {
      type: String,
      required: [true, "Start time is required"],
      match: [
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Start time must be in HH:MM format",
      ],
    },
    endTime: {
      type: String,
      required: [true, "End time is required"],
      match: [
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "End time must be in HH:MM format",
      ],
    },
    payableAmount: {
      type: Number,
      min: [0, "Payable amount cannot be negative"],
    },
    isBooked: {
      type: String,
      enum: {
        values: ["confirmed", "unconfirmed", "canceled"],
        message: "{VALUE} is not a valid booking status",
      },
      default: "confirmed",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Calculate payable amount before saving
bookingSchema.pre("save", async function (next) {
  try {
    // Fetch facility to get price per hour
    const facility = await Facility.findById(this.facility);
    if (!facility) {
      throw new Error("Facility not found");
    }

    // Parse time strings to calculate duration
    const [startHour, startMinute] = this.startTime.split(":").map(Number);
    const [endHour, endMinute] = this.endTime.split(":").map(Number);

    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    if (endTotalMinutes <= startTotalMinutes) {
      throw new Error("End time must be after start time");
    }

    // Calculate duration in hours
    const durationInMinutes = endTotalMinutes - startTotalMinutes;
    const durationInHours = durationInMinutes / 60;

    // Calculate payable amount
    this.payableAmount =
      Math.round(durationInHours * facility.pricePerHour * 100) / 100;

    next();
  } catch (error: any) {
    next(error);
  }
});

// Populate facility and user on find queries
bookingSchema.pre(/^find/, function (next) {
  this.populate("facility").populate({
    path: "user",
    select: "-password",
  });
  next();
});

export const Booking = model<IBooking>("Booking", bookingSchema);
