import { Response } from 'express';
import httpStatus from 'http-status';

export const handleNotFound = <T>(
  res: Response,
  data: T | null,
  message: string,
) => {
  if (!data) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: message,
      data: null || undefined,
    });
  }
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
