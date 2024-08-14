"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Facility = void 0;
const mongoose_1 = require("mongoose");
const facilitiesSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    pricePerHour: { type: Number, required: true },
    location: { type: String, required: true },
    // days: [{ type: String, enum: Days, required: true }],
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
});
exports.Facility = (0, mongoose_1.model)('Facility', facilitiesSchema);
