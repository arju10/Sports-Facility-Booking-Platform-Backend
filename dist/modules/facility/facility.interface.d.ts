import { Types } from "mongoose";
export interface IFacility {
    _id?: Types.ObjectId;
    name: string;
    description: string;
    pricePerHour: number;
    location: string;
    image?: string;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=facility.interface.d.ts.map