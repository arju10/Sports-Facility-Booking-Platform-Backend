import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacilityService } from "./facility.service";
import { Request , Response} from 'express';
import { uploadToCloudinary } from '../../utils/uploadToCloudinary';
// Create facility
// const createFacility = catchAsync(async (req, res) => {
//   const result = await FacilityService.createFacility(req.body);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.CREATED,
//     message: "Facility created successfully",
//     data: result,
//   });
// });
const createFacility = catchAsync(async (req: Request, res: Response) => {
  let imageUrl = '';
  
  // Handle image upload if file is present
  if (req.file) {
    const filename = `facility-${Date.now()}`;
    imageUrl = await uploadToCloudinary(req.file.buffer, filename, 'facilities');
  }

  const facilityData = {
    ...req.body,
    image: imageUrl || req.body.image, // Use uploaded image or provided URL
  };

  const result = await FacilityService.createFacility(facilityData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Facility created successfully',
    data: result,
  });
});


// Get all facilities
const getAllFacilities = catchAsync(async (req, res) => {
  const result = await FacilityService.getAllFacilities(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facilities retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

// Get single facility
const getFacilityById = catchAsync(async (req, res) => {
  const result = await FacilityService.getFacilityById(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facility retrieved successfully",
    data: result,
  });
});

// Update facility
// const updateFacility = catchAsync(async (req, res) => {
//   const result = await FacilityService.updateFacility(req.params.id, req.body);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Facility updated successfully",
//     data: result,
//   });
// });


const updateFacility = catchAsync(async (req: Request, res: Response) => {
  let imageUrl;
  
  // Handle image upload if file is present
  if (req.file) {
    const filename = `facility-${Date.now()}`;
    imageUrl = await uploadToCloudinary(req.file.buffer, filename, 'facilities');
  }

  const updateData = {
    ...req.body,
    ...(imageUrl && { image: imageUrl }), // Only add image if uploaded
  };

  const result = await FacilityService.updateFacility(req.params.id, updateData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facility updated successfully',
    data: result,
  });
});


// Delete facility
const deleteFacility = catchAsync(async (req, res) => {
  const result = await FacilityService.deleteFacility(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facility deleted successfully",
    data: result,
  });
});

export const FacilityController = {
  createFacility,
  getAllFacilities,
  getFacilityById,
  updateFacility,
  deleteFacility,
};
