"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const facility_service_1 = require("./facility.service");
// Create facility
const createFacility = (0, catchAsync_1.default)(async (req, res) => {
    const result = await facility_service_1.FacilityService.createFacility(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Facility created successfully",
        data: result,
    });
});
// Get all facilities
const getAllFacilities = (0, catchAsync_1.default)(async (req, res) => {
    const result = await facility_service_1.FacilityService.getAllFacilities(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Facilities retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
});
// Get single facility
const getFacilityById = (0, catchAsync_1.default)(async (req, res) => {
    const result = await facility_service_1.FacilityService.getFacilityById(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Facility retrieved successfully",
        data: result,
    });
});
// Update facility
const updateFacility = (0, catchAsync_1.default)(async (req, res) => {
    const result = await facility_service_1.FacilityService.updateFacility(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Facility updated successfully",
        data: result,
    });
});
// Delete facility
const deleteFacility = (0, catchAsync_1.default)(async (req, res) => {
    const result = await facility_service_1.FacilityService.deleteFacility(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Facility deleted successfully",
        data: result,
    });
});
exports.FacilityController = {
    createFacility,
    getAllFacilities,
    getFacilityById,
    updateFacility,
    deleteFacility,
};
//# sourceMappingURL=facility.controller.js.map