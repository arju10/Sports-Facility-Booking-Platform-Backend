// import { ErrorRequestHandler } from "express";
// import { ZodError } from "zod";
// import mongoose from "mongoose";
// import config from "../config";
// import AppError from "../errors/AppError";
// import {
//   handleZodError,
//   handleValidationError,
//   handleCastError,
//   handleDuplicateError,
// } from "../errors/errorHandlers";

// interface ErrorSource {
//   path: string | number;
//   message: string;
// }

// interface ErrorResponse {
//   success: false;
//   message: string;
//   errorSources: ErrorSource[];
//   stack?: string;
// }

// const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
//   let statusCode = err.statusCode || 500;
//   let message = err.message || "Something went wrong";
//   let errorSources: ErrorSource[] = [
//     {
//       path: "",
//       message: "Something went wrong",
//     },
//   ];

//   // Handle specific error types
//   if (err instanceof ZodError) {
//     const simplifiedError = handleZodError(err);
//     statusCode = simplifiedError.statusCode;
//     message = simplifiedError.message;
//     errorSources = simplifiedError.errorSources;
//   } else if (err?.name === "ValidationError") {
//     const simplifiedError = handleValidationError(err);
//     statusCode = simplifiedError.statusCode;
//     message = simplifiedError.message;
//     errorSources = simplifiedError.errorSources;
//   } else if (err?.name === "CastError") {
//     const simplifiedError = handleCastError(err);
//     statusCode = simplifiedError.statusCode;
//     message = simplifiedError.message;
//     errorSources = simplifiedError.errorSources;
//   } else if (err?.code === 11000) {
//     const simplifiedError = handleDuplicateError(err);
//     statusCode = simplifiedError.statusCode;
//     message = simplifiedError.message;
//     errorSources = simplifiedError.errorSources;
//   } else if (err instanceof AppError) {
//     statusCode = err.statusCode;
//     message = err.message;
//     errorSources = [
//       {
//         path: "",
//         message: err.message,
//       },
//     ];
//   } else if (err instanceof Error) {
//     message = err.message;
//     errorSources = [
//       {
//         path: "",
//         message: err.message,
//       },
//     ];
//   }

//   // Send error response
//   const response: ErrorResponse = {
//     success: false,
//     message,
//     errorSources,
//   };

//   // Include stack trace in development
//   if (config.NODE_ENV === "development") {
//     response.stack = err.stack;
//   }

//   res.status(statusCode).json(response);
// };

// export default globalErrorHandler;

/**
 * ============================================
 * GLOBAL ERROR HANDLER - THE MASTER HANDLER
 * ============================================
 *
 * PURPOSE: Catch ALL errors in the application and send proper response
 *
 * HOW IT WORKS:
 * 1. Catches any error thrown anywhere in the app
 * 2. Identifies what TYPE of error it is
 * 3. Uses specific handler for that error type
 * 4. Sends clean response to client
 *
 * THIS IS THE LAST LINE OF DEFENSE!
 */

import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import mongoose from "mongoose";
import config from "../config";
import AppError from "../errors/AppError";
import {
  handleZodError,
  handleValidationError,
  handleCastError,
  handleDuplicateError,
} from "../errors/errorHandlers";

interface ErrorSource {
  path: string | number;
  message: string;
}

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Default values (if we can't identify the error)
  let statusCode = 500; // 500 = Internal Server Error
  let message = "Something went wrong";
  let errorSources: ErrorSource[] = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  /**
   * ============================================
   * STEP 1: IDENTIFY ERROR TYPE
   * ============================================
   */

  // TYPE 1: Zod Validation Error
  if (err instanceof ZodError) {
    const simplified = handleZodError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorSources = simplified.errorSources;
  }

  // TYPE 2: Mongoose Validation Error
  else if (err?.name === "ValidationError") {
    const simplified = handleValidationError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorSources = simplified.errorSources;
  }

  // TYPE 3: Mongoose Cast Error (Invalid ID)
  else if (err?.name === "CastError") {
    const simplified = handleCastError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorSources = simplified.errorSources;
  }

  // TYPE 4: MongoDB Duplicate Error
  else if (err?.code === 11000) {
    const simplified = handleDuplicateError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorSources = simplified.errorSources;
  }

  // TYPE 5: Our Custom AppError
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  // TYPE 6: Generic JavaScript Error
  else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  /**
   * ============================================
   * STEP 2: BUILD RESPONSE
   * ============================================
   */

  const response = {
    success: false,
    message,
    errorSources,
    // In development, send stack trace for debugging
    ...(config.NODE_ENV === "development" && { stack: err.stack }),
  };

  /**
   * ============================================
   * STEP 3: LOG ERROR (for developers to see)
   * ============================================
   */

  console.error("❌ Error occurred:", {
    statusCode,
    message,
    path: req.path,
    method: req.method,
  });

  /**
   * ============================================
   * STEP 4: SEND RESPONSE TO CLIENT
   * ============================================
   */

  res.status(statusCode).json(response);
};

export default globalErrorHandler;

/**
 * ============================================
 * HOW THIS WORKS - SIMPLE FLOW:
 * ============================================
 *
 * 1. Error happens anywhere in app
 *    ↓
 * 2. Express catches it
 *    ↓
 * 3. Sends to globalErrorHandler
 *    ↓
 * 4. We check: What type of error?
 *    - Zod validation? → handleZodError
 *    - Mongoose validation? → handleValidationError
 *    - Invalid ID? → handleCastError
 *    - Duplicate? → handleDuplicateError
 *    - Custom error? → Use as is
 *    ↓
 * 5. Format error nicely
 *    ↓
 * 6. Send to client
 *
 * ============================================
 * EXAMPLE FLOW:
 * ============================================
 *
 * User tries: POST /api/auth/signup
 * With: { "email": "test" } (missing password, invalid email)
 *
 * 1. Zod validation fails
 * 2. Throws ZodError
 * 3. globalErrorHandler catches it
 * 4. Checks: "Is it ZodError?" → YES
 * 5. Calls handleZodError
 * 6. Gets formatted errors
 * 7. Sends to client:
 *
 * {
 *   "success": false,
 *   "message": "Validation Error",
 *   "errorSources": [
 *     { "path": "email", "message": "Invalid email format" },
 *     { "path": "password", "message": "Password is required" }
 *   ]
 * }
 *
 * Client sees clear errors and can fix them!
 */
