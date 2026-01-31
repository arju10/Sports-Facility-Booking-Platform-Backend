import { Request, Response } from "express";
import httpStatus from "http-status";

const notFound = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API endpoint not found",
    error: `Cannot ${req.method} ${req.originalUrl}`,
  });
};

export default notFound;
