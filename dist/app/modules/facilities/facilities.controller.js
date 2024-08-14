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
exports.FacilityControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const facilities_service_1 = require("./facilities.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const handleNotFound_1 = require("../../utils/handleNotFound");
// Create Single Facility  ==== API: ("/api/facility") === Method :[ POST]
const createFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facilities_service_1.FacilityServices.createFacilityIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Facility is created successfully',
        data: result,
    });
}));
// Get All Facilities with pagination ==== API: ("/api/facility//?page=1&limit=10") === Method :[ GET]
const getAllFacilities = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facilities_service_1.FacilityServices.getAllFacilitiesFromDB(req.query);
    // Check if data is found
    if ((0, handleNotFound_1.handleNotFound)(res, result, 'No Data Found')) {
        return;
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Facilities retrived successfully',
        data: result,
    });
}));
// Get Single Facility by ID ==== API: ("/api/facility/:id") === Method :[ GET]
const getSingleFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield facilities_service_1.FacilityServices.getSingleFacilityFromDB(id);
    (0, handleNotFound_1.handleNotFound)(res, result, 'No Data Found');
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Facility retrived successfully',
        data: result,
    });
}));
// Update Facility by ID ==== API: ("/api/facility/:id") === Method :[ PATCH]
const updateFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield facilities_service_1.FacilityServices.updateSingleFacilityIntoDB(id, req.body);
    (0, handleNotFound_1.handleNotFound)(res, result, 'No Data Found');
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Facility is updated successfully',
        data: result,
    });
}));
// Delete Facility by ID ==== API: ("/api/facility/:id") === Method :[ DELETE]
const deleteSingleFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield facilities_service_1.FacilityServices.deleteSingleFacilityFromDB(id);
    (0, handleNotFound_1.handleNotFound)(res, result, 'No Data Found');
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Facility is Deleted Successfully',
        data: result,
    });
}));
exports.FacilityControllers = {
    createFacility,
    getAllFacilities,
    getSingleFacility,
    updateFacility,
    deleteSingleFacility,
};
