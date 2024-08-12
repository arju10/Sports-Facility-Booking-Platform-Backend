import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { FacilityServices } from './facilities.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

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

export const FacilityControllers = {
  createFacility,
};
