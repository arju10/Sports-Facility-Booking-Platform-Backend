import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { FacilityServices } from './facilities.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { handleNotFound } from '../../utils/handleNotFound';

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

export const FacilityControllers = {
  createFacility,
  getAllFacilities,
};
