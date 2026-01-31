/**
 * ============================================
 * ZOD VALIDATION ERROR HANDLER
 * ============================================
 *
 * PURPOSE: Convert Zod validation errors into readable format
 *
 * WHEN IT HAPPENS:
 * - User sends invalid data (missing fields, wrong format, etc.)
 * - Example: User sends email without @ symbol
 *
 * WHAT IT DOES:
 * - Takes Zod's complex error object
 * - Converts it to simple, readable messages
 */

import { ZodError } from "zod";

interface ErrorSource {
  path: string | number; // Which field has error (e.g., "email", "password")
  message: string; // What's wrong (e.g., "Email is required")
}

export const handleZodError = (error: ZodError) => {
  // Extract each error from Zod
  const errorSources: ErrorSource[] = error.issues.map((issue) => {
    return {
      path: issue.path[issue.path.length - 1], // Get the field name
      message: issue.message, // Get the error message
    };
  });

  return {
    statusCode: 400, // 400 = Bad Request
    message: "Validation Error",
    errorSources,
  };
};

/**
 * ============================================
 * EXAMPLE:
 * ============================================
 *
 * USER SENDS:
 * {
 *   "email": "notanemail",  // Invalid email format
 *   "password": "123"       // Too short
 * }
 *
 * ZOD ERROR (complex):
 * {
 *   issues: [
 *     { path: ['email'], message: 'Invalid email format' },
 *     { path: ['password'], message: 'Password must be at least 6 characters' }
 *   ]
 * }
 *
 * OUR HANDLER CONVERTS TO (simple):
 * {
 *   statusCode: 400,
 *   message: "Validation Error",
 *   errorSources: [
 *     { path: "email", message: "Invalid email format" },
 *     { path: "password", message: "Password must be at least 6 characters" }
 *   ]
 * }
 *
 * CLIENT RECEIVES: Clear error messages for each field!
 */
