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
declare const globalErrorHandler: ErrorRequestHandler;
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
//# sourceMappingURL=globalErrorHandler.d.ts.map