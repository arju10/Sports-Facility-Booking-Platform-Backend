import { model, Schema } from 'mongoose';
import { TFacilities } from './facilities.interface';
import { Days } from './facilities.constant';

const facilitiesSchema = new Schema<TFacilities>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  pricePerHour: { type: Number, required: true },
  location: { type: String, required: true },
  // days: [{ type: String, enum: Days, required: true }],
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

export const Facility = model<TFacilities>('Facility', facilitiesSchema);