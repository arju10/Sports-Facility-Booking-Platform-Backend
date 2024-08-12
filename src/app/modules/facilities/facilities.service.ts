import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { FacilitySearchbleFields } from './facilities.constant';
import { TFacilities } from './facilities.interface';
import { Facility } from './facilities.model';

// Create Single Facility  ==== API: ("/api/facility") === Method :[ POST]
const createFacilityIntoDB = async (payload: TFacilities) => {
  const result = await Facility.create(payload);
  return result;
};

// Get All Facilities with pagination ==== API: ("/api/facility//?page=1&limit=10") === Method :[ GET]
const getAllFacilitiesFromDB = async (query: Record<string, unknown>) => {
  const facilityQuery = new QueryBuilder(Facility.find(), query)
    .search(FacilitySearchbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facilityQuery.modelQuery;

  const meta = await facilityQuery.countTotal();

  return {
    meta,
    result,
  };
};
export const FacilityServices = {
  createFacilityIntoDB,
  getAllFacilitiesFromDB,
};
