// export type TDays = 'Sat' | 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';

export type TFacilities = {
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  // Added by me for my future project
  // days: TDays[];
  startTime: string;
  endTime: string;
  isDeleted: boolean;
};

// export type TSchedule = {
//   days: TDays[];
//   startTime: string;
//   endTime: string;
// };


// export type TDays = 'Sat' | 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';

// export type TTimeSlot = {
//   startTime: string;
//   endTime: string;
// };

// export type TFacilities = {
//   name: string;
//   description: string;
//   pricePerHour: number;
//   location: string;
//   days: TDays[];
//   timeSlots: TTimeSlot[];
//   isDeleted: boolean;
// };

// export type TSchedule = {
//   days: TDays[];
//   timeSlots: TTimeSlot[];
// };

