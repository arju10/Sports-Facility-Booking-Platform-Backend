import { Response } from "express";

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  token?: string;
}

const sendResponse = <T>(res: Response, data: ApiResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    ...(data.token && { token: data.token }),
    ...(data.meta && { meta: data.meta }),
    ...(data.data !== undefined && { data: data.data }),
  });
};

export default sendResponse;
