import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Facility } from "./facility.model";
import { IFacility } from "./facility.interface";
import QueryBuilder from "../../utils/QueryBuilder";

const facilitySearchableFields = ["name", "location", "description"];

// Create facility
const createFacility = async (payload: IFacility): Promise<IFacility> => {
  const result = await Facility.create(payload);
  return result;
};

// Get all facilities with filtering, sorting, pagination
const getAllFacilities = async (query: Record<string, unknown>) => {
  const facilityQuery = new QueryBuilder(Facility.find(), query)
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
const getFacilityById = async (id: string): Promise<IFacility> => {
  const result = await Facility.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Facility not found");
  }

  return result;
};

// Update facility
const updateFacility = async (
  id: string,
  payload: Partial<IFacility>,
): Promise<IFacility> => {
  const facility = await Facility.findById(id);

  if (!facility) {
    throw new AppError(httpStatus.NOT_FOUND, "Facility not found");
  }

  const result = await Facility.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result!;
};

// Soft delete facility
const deleteFacility = async (id: string): Promise<IFacility> => {
  const facility = await Facility.findById(id);

  if (!facility) {
    throw new AppError(httpStatus.NOT_FOUND, "Facility not found");
  }

  const result = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return result!;
};

export const FacilityService = {
  createFacility,
  getAllFacilities,
  getFacilityById,
  updateFacility,
  deleteFacility,
};
