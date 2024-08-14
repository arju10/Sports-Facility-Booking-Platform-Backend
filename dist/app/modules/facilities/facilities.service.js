"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const facilities_constant_1 = require("./facilities.constant");
const facilities_model_1 = require("./facilities.model");
// Create Single Facility  ==== API: ("/api/facility") === Method :[ POST]
const createFacilityIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facilities_model_1.Facility.create(payload);
    return result;
});
// Get All Facilities with pagination ==== API: ("/api/facility//?page=1&limit=10") === Method :[ GET]
const getAllFacilitiesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const facilityQuery = new QueryBuilder_1.default(facilities_model_1.Facility.find(), query)
        .search(facilities_constant_1.FacilitySearchbleFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield facilityQuery.modelQuery;
    const meta = yield facilityQuery.countTotal();
    return {
        meta,
        result,
    };
});
// Get Single Facility by ID ==== API: ("/api/facility/:id") === Method :[ GET]
const getSingleFacilityFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facilities_model_1.Facility.findById(id);
    return result;
});
// Update Facility by ID ==== API: ("/api/facility/:id") === Method :[ PATCH]
const updateSingleFacilityIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facilities_model_1.Facility.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
// Delete Facility by ID ==== API: ("/api/facility/:id") === Method :[ DELETE]
const deleteSingleFacilityFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facilities_model_1.Facility.findByIdAndDelete(id);
    return result;
});
exports.FacilityServices = {
    createFacilityIntoDB,
    getAllFacilitiesFromDB,
    getSingleFacilityFromDB,
    updateSingleFacilityIntoDB,
    deleteSingleFacilityFromDB,
};
