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
    path: string | number;
    message: string;
}
export declare const handleZodError: (error: ZodError) => {
    statusCode: number;
    message: string;
    errorSources: ErrorSource[];
};
export {};
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
//# sourceMappingURL=handleZodError.d.ts.map