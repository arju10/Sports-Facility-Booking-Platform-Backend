import { Types } from "mongoose";

export type BookingStatus = "confirmed" | "unconfirmed" | "canceled";

export interface IBooking {
  _id?: Types.ObjectId;
  facility: Types.ObjectId;
  user: Types.ObjectId;
  date: string; // Format: YYYY-MM-DD
  startTime: string; // Format: HH:MM (24-hour)
  endTime: string; // Format: HH:MM (24-hour)
  payableAmount?: number;
  isBooked: BookingStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITimeSlot {
  startTime: string;
  endTime: string;
}

export interface IAvailableSlots {
  date: string;
  availableSlots: ITimeSlot[];
}
