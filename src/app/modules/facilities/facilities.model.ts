import { model, Schema } from 'mongoose';
import { TFacilities } from './facilities.interface';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';

const facilitiesSchema = new Schema<TFacilities>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  pricePerHour: { type: Number, required: true },
  location: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

// facilitiesSchema.pre('save',async function(next) {
//   const isFacilityExit = await Facility.findOne({
//     name : this.name
//   })
//   if (!isFacilityExit){
//     throw new AppError(httpStatus.NOT_FOUND,'Facility is not found!!!!!!')
//   }
//   next()
// })
export const Facility = model<TFacilities>('Facility', facilitiesSchema);
