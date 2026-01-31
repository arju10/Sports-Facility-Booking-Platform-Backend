import { Types } from "mongoose";
import { IBooking, IAvailableSlots } from "./booking.interface";
export declare const BookingService: {
    checkAvailability: (date: string, facilityId?: string) => Promise<IAvailableSlots[]>;
    createBooking: (userId: string, payload: Omit<IBooking, "user">) => Promise<IBooking>;
    getAllBookings: (query: Record<string, unknown>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
        data: (import("mongoose").Document<unknown, {}, IBooking, {}, {}> & IBooking & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    getUserBookings: (userId: string) => Promise<IBooking[]>;
    cancelBooking: (bookingId: string, userId: string) => Promise<IBooking>;
};
//# sourceMappingURL=booking.service.d.ts.map