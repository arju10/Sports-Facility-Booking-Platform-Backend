/**
 * ============================================
 * CUSTOM ERROR CLASS - AppError
 * ============================================
 *
 * PURPOSE: Create custom errors with specific status codes
 *
 * WHEN TO USE:
 * - When you want to throw an error with a specific HTTP status
 * - Example: User not found (404), Unauthorized (401), etc.
 *
 * EXAMPLE USAGE:
 * throw new AppError(404, 'User not found');
 * throw new AppError(401, 'Invalid credentials');
 */
declare class AppError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string);
}
export default AppError;
/**
 * ============================================
 * SIMPLE EXPLANATION:
 * ============================================
 *
 * This is like a custom error object that remembers:
 * 1. What went wrong (message)
 * 2. What HTTP code to send (statusCode)
 *
 * Instead of just: throw new Error('Something wrong')
 * You do: throw new AppError(404, 'User not found')
 *
 * The 404 tells Express what status code to send to the client!
 */
//# sourceMappingURL=AppError.d.ts.map