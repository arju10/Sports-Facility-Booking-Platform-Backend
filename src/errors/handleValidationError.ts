/**
 * ============================================
 * MONGOOSE VALIDATION ERROR HANDLER
 * ============================================
 *
 * PURPOSE: Handle errors from Mongoose schema validation
 *
 * WHEN IT HAPPENS:
 * - Data doesn't match Mongoose schema rules
 * - Example: Required field is missing, number is negative when it should be positive
 *
 * WHAT IT DOES:
 * - Extracts all validation errors from Mongoose
 * - Formats them nicely for the client
 */

import mongoose from "mongoose";

interface ErrorSource {
  path: string | number;
  message: string;
}

export const handleValidationError = (
  error: mongoose.Error.ValidationError,
) => {
  // Mongoose stores errors in an object, we need to convert it to array
  const errorSources: ErrorSource[] = Object.values(error.errors).map((err) => {
    return {
      path: err.path, // Field name (e.g., "name", "email")
      message: err.message, // Error message (e.g., "Name is required")
    };
  });

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};

/**
 * ============================================
 * EXAMPLE:
 * ============================================
 *
 * MONGOOSE SCHEMA:
 * {
 *   name: { type: String, required: true },
 *   email: { type: String, required: true },
 *   age: { type: Number, min: 18 }
 * }
 *
 * USER SENDS:
 * {
 *   email: "test@test.com",
 *   age: 15
 * }
 *
 * MONGOOSE ERROR (complex):
 * {
 *   errors: {
 *     name: { path: 'name', message: 'Name is required' },
 *     age: { path: 'age', message: 'Age must be at least 18' }
 *   }
 * }
 *
 * OUR HANDLER CONVERTS TO (simple):
 * {
 *   statusCode: 400,
 *   message: "Validation Error",
 *   errorSources: [
 *     { path: "name", message: "Name is required" },
 *     { path: "age", message: "Age must be at least 18" }
 *   ]
 * }
 *
 * CLIENT SEES: Which fields are wrong and why!
 */
