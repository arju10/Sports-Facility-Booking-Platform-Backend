/**
 * ============================================
 * MONGOOSE CAST ERROR HANDLER
 * ============================================
 *
 * PURPOSE: Handle invalid ID or type conversion errors
 *
 * WHEN IT HAPPENS:
 * - User sends invalid MongoDB ObjectId
 * - Example: GET /api/facility/123 (123 is not a valid ObjectId)
 * - Valid ObjectId looks like: "507f1f77bcf86cd799439011"
 *
 * WHAT IT DOES:
 * - Tells user the ID format is wrong
 */

import mongoose from "mongoose";

interface ErrorSource {
  path: string | number;
  message: string;
}

export const handleCastError = (error: mongoose.Error.CastError) => {
  const errorSources: ErrorSource[] = [
    {
      path: error.path, // Which field (usually "_id")
      message: `Invalid ${error.path}`, // Simple message
    },
  ];

  return {
    statusCode: 400,
    message: "Invalid ID format",
    errorSources,
  };
};

/**
 * ============================================
 * EXAMPLE:
 * ============================================
 *
 * USER REQUESTS:
 * GET /api/facility/12345
 *
 * PROBLEM:
 * "12345" is not a valid MongoDB ObjectId
 * Valid ID: "507f1f77bcf86cd799439011" (24 hex characters)
 *
 * MONGOOSE ERROR (complex):
 * {
 *   name: "CastError",
 *   path: "_id",
 *   value: "12345",
 *   kind: "ObjectId"
 * }
 *
 * OUR HANDLER CONVERTS TO (simple):
 * {
 *   statusCode: 400,
 *   message: "Invalid ID format",
 *   errorSources: [
 *     { path: "_id", message: "Invalid _id" }
 *   ]
 * }
 *
 * CLIENT SEES: Clear message that the ID is wrong!
 */
