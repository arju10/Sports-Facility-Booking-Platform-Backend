import { TFacilities } from './facilities.interface';
import { Facility } from './facilities.model';

// Create Single Facility  ==== API: ("/api/facility") === Method :[ POST]
const createFacilityIntoDB = async (payload: TFacilities) => {
  const result = await Facility.create(payload);
  return result;
};

export const FacilityServices = {
  createFacilityIntoDB,
};
