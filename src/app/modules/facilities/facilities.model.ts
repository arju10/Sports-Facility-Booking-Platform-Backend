import { model, Schema } from 'mongoose';
import { TFacilities } from './facilities.interface';

const facilitiesSchema = new Schema<TFacilities>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  pricePerHour: { type: Number, required: true },
  location: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

export const Facility = model<TFacilities>('Facility', facilitiesSchema);
