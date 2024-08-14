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