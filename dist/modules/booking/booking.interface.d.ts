import { Types } from "mongoose";
export type BookingStatus = "confirmed" | "unconfirmed" | "canceled";
export interface IBooking {
    _id?: Types.ObjectId;
    facility: Types.ObjectId;
    user: Types.ObjectId;
    date: string;
    startTime: string;
    endTime: string;
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
//# sourceMappingURL=booking.interface.d.ts.map