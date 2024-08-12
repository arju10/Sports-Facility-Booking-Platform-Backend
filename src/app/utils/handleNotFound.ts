import { Response } from 'express';
import httpStatus from 'http-status';

// export const handleNotFound = <T>(
//   res: Response,
//   data: T | null,
//   message: string = 'No Data Found',
// ) => {
//   if (!data || (Array.isArray(data) && data.length === 0)) {
//     return res.status(httpStatus.NOT_FOUND).json({
//       success: false,
//       statusCode: httpStatus.NOT_FOUND,
//       message: message,
//       data: [],
//     });
//   }
// };

export const handleNotFound = <T>(
  res: Response,
  data: T | null,
  message: string = 'No Data Found',
) => {
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: message,
      data: [],
    });
  }
  return null; // This indicates that data was found
};

export const handleInsufficientQuantity = <T>(
  res: Response,
  data: T | null,
  message: string,
) => {
  return res.status(httpStatus.BAD_REQUEST).json({
    success: false,
    message: message,
    data: data,
  });
};
