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

// Get Single Facility by ID ==== API: ("/api/facility/:id") === Method :[ GET]
const getSingleFacilityFromDB = async (id: string) => {
  const result = await Facility.findById(id);
  return result;
};

// Update Facility by ID ==== API: ("/api/facility/:id") === Method :[ PATCH]
const updateSingleFacilityIntoDB = async (
  id: string,
  payload: Partial<TFacilities>,
) => {
  const result = await Facility.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// Delete Facility by ID ==== API: ("/api/facility/:id") === Method :[ DELETE]
const deleteSingleFacilityFromDB = async (id: string) => {
  const result = await Facility.findByIdAndDelete(id);

  return result;
};
export const FacilityServices = {
  createFacilityIntoDB,
  getAllFacilitiesFromDB,
  getSingleFacilityFromDB,
  updateSingleFacilityIntoDB,
  deleteSingleFacilityFromDB,
};
