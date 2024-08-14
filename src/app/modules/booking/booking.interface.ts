import { Types } from 'mongoose';


export type TBookings = {
  date: string;
  days:'Sat'| 'Sun'| 'Mon'| 'Tue'| 'Wed'| 'Thu'| 'Fri';
  startTime: string;
  endTime: string;
  user?: Types.ObjectId;
  facility?: Types.ObjectId;
  payableAmount?: number;
  isBooked: 'confirmed' | 'unconfirmed' | 'canceled';
};

