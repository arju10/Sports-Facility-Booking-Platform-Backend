import mongoose from "mongoose";
import { ZodError } from "zod";

interface ErrorSource {
  path: string | number;
  message: string;
}

interface ErrorResponse {
  statusCode: number;
  message: string;
  errorSources: ErrorSource[];
}

// Handle Zod validation errors
export const handleZodError = (error: ZodError): ErrorResponse => {
  const errorSources: ErrorSource[] = error.issues.map((issue) => ({
    path: issue.path[issue.path.length - 1],
    message: issue.message,
  }));

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};

// Handle Mongoose validation errors
export const handleValidationError = (
  error: mongoose.Error.ValidationError,
): ErrorResponse => {
  const errorSources: ErrorSource[] = Object.values(error.errors).map(
    (err) => ({
      path: err.path,
      message: err.message,
    }),
  );

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};

// Handle Mongoose cast errors (invalid ObjectId, etc.)
export const handleCastError = (
  error: mongoose.Error.CastError,
): ErrorResponse => {
  const errorSources: ErrorSource[] = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  return {
    statusCode: 400,
    message: "Invalid ID",
    errorSources,
  };
};

// Handle duplicate key errors
export const handleDuplicateError = (error: any): ErrorResponse => {
  const match = error.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];

  const errorSources: ErrorSource[] = [
    {
      path: Object.keys(error.keyValue)[0],
      message: `${extractedMessage} already exists`,
    },
  ];

  return {
    statusCode: 400,
    message: "Duplicate Entry",
    errorSources,
  };
};
