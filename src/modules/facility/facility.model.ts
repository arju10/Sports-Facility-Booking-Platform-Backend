import { Schema, model } from "mongoose";
import { IFacility } from "./facility.interface";

const facilitySchema = new Schema<IFacility>(
  {
    name: {
      type: String,
      required: [true, "Facility name is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    pricePerHour: {
      type: Number,
      required: [true, "Price per hour is required"],
      min: [0, "Price cannot be negative"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Query middleware to filter out deleted facilities
facilitySchema.pre(/^find/, function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Facility = model<IFacility>("Facility", facilitySchema);
