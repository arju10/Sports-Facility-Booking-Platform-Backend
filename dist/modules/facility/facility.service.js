"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const facility_model_1 = require("./facility.model");
const QueryBuilder_1 = __importDefault(require("../../utils/QueryBuilder"));
const facilitySearchableFields = ["name", "location", "description"];
// Create facility
const createFacility = async (payload) => {
    const result = await facility_model_1.Facility.create(payload);
    return result;
};
// Get all facilities with filtering, sorting, pagination
const getAllFacilities = async (query) => {
    const facilityQuery = new QueryBuilder_1.default(facility_model_1.Facility.find(), query)
        .search(facilitySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await facilityQuery.modelQuery;
    const meta = await facilityQuery.countTotal();
    return {
        meta,
        data: result,
    };
};
// Get single facility by ID
const getFacilityById = async (id) => {
    const result = await facility_model_1.Facility.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Facility not found");
    }
    return result;
};
// Update facility
const updateFacility = async (id, payload) => {
    const facility = await facility_model_1.Facility.findById(id);
    if (!facility) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Facility not found");
    }
    const result = await facility_model_1.Facility.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};
// Soft delete facility
const deleteFacility = async (id) => {
    const facility = await facility_model_1.Facility.findById(id);
    if (!facility) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Facility not found");
    }
    const result = await facility_model_1.Facility.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
};
exports.FacilityService = {
    createFacility,
    getAllFacilities,
    getFacilityById,
    updateFacility,
    deleteFacility,
};
//# sourceMappingURL=facility.service.js.map