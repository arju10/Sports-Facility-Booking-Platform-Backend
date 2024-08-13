import { Response } from 'express';

type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  token?: string;
  meta?: TMeta;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    token: data.token,
    meta: data.meta,
    data: data.data,
  });
};

// const sendResponse = <T>(res: Response, data: TResponse<T>) => {
//   const { statusCode, success, message, meta, data: responseData } = data;
//   const responseObject: Record<string, any> = {
//     success,
//     message,
//   };

//   if (meta) {
//     responseObject.meta = meta;
//   }

//   responseObject.data = responseData;

//   res.status(statusCode).json(responseObject);
// };

export default sendResponse;
