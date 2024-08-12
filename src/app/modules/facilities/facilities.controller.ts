import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { FacilityServices } from './facilities.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { handleNotFound } from '../../utils/handleNotFound';
import notFound from '../../middlewares/notFound';

// Create Single Facility  ==== API: ("/api/facility") === Method :[ POST]
const createFacility = catchAsync(async (req: Request, res: Response) => {
  const result = await FacilityServices.createFacilityIntoDB(req.body);
  // console.log("data",result)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Facility is created successfully',
    data: result,
  });
});

// Get All Facilities with pagination ==== API: ("/api/facility//?page=1&limit=10") === Method :[ GET]
const getAllFacilities = catchAsync(async (req: Request, res: Response) => {
  const result = await FacilityServices.getAllFacilitiesFromDB(req.query);

  // Check if data is found
  if (handleNotFound(res, result, 'No Data Found')) {
    return;
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facilities retrived successfully',
    data: result,
  });
});

// Get Single Facility by ID ==== API: ("/api/facility/:id") === Method :[ GET]
const getSingleFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacilityServices.getSingleFacilityFromDB(id);

  handleNotFound(res, result, 'No Data Found');

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facility retrived successfully',
    data: result,
  });
});
export const FacilityControllers = {
  createFacility,
  getAllFacilities,
  getSingleFacility,
};
