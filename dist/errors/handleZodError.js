"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const handleZodError = (error) => {
    // Extract each error from Zod
    const errorSources = error.issues.map((issue) => {
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
exports.handleZodError = handleZodError;
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
//# sourceMappingURL=handleZodError.js.map