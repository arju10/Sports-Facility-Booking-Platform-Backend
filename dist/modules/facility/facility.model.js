"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Facility = void 0;
const mongoose_1 = require("mongoose");
const facilitySchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
    versionKey: false,
});
// Query middleware to filter out deleted facilities
facilitySchema.pre(/^find/, function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
exports.Facility = (0, mongoose_1.model)("Facility", facilitySchema);
//# sourceMappingURL=facility.model.js.map