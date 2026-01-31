/**
 * ============================================
 * DUPLICATE KEY ERROR HANDLER (MongoDB Error Code 11000)
 * ============================================
 *
 * PURPOSE: Handle when user tries to create duplicate unique field
 *
 * WHEN IT HAPPENS:
 * - User tries to signup with email that already exists
 * - User tries to create facility with name that already exists
 * - Happens for any field marked as "unique" in schema
 *
 * WHAT IT DOES:
 * - Tells user which field is duplicate
 */
interface ErrorSource {
    path: string | number;
    message: string;
}
export declare const handleDuplicateError: (error: any) => {
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
 * SCENARIO:
 * - Database already has user with email: "john@test.com"
 * - New user tries to signup with same email
 *
 * USER SENDS:
 * {
 *   "name": "Jane",
 *   "email": "john@test.com",  // This email already exists!
 *   "password": "123456"
 * }
 *
 * MONGODB ERROR (complex):
 * {
 *   code: 11000,
 *   keyValue: { email: "john@test.com" },
 *   message: 'E11000 duplicate key error... email: "john@test.com"'
 * }
 *
 * OUR HANDLER CONVERTS TO (simple):
 * {
 *   statusCode: 400,
 *   message: "Duplicate Entry",
 *   errorSources: [
 *     { path: "email", message: "john@test.com already exists" }
 *   ]
 * }
 *
 * CLIENT SEES: "Email john@test.com already exists"
 */
//# sourceMappingURL=handleDuplicateError.d.ts.map