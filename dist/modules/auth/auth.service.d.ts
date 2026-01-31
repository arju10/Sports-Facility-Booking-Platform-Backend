import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../user/user.interface";
import { ILoginUser, IChangePassword, IAuthResponse } from "./auth.interface";
export declare const AuthService: {
    signup: (payload: IUser) => Promise<IAuthResponse>;
    login: (payload: ILoginUser) => Promise<IAuthResponse>;
    changePassword: (userData: JwtPayload, payload: IChangePassword) => Promise<void>;
};
/**
 * ============================================
 * WHAT CHANGED?
 * ============================================
 *
 * BEFORE:
 * - Manually checked for duplicate email
 * - Manually checked for duplicate phone
 * - Threw custom AppError for duplicates
 * - Result: Generic error message
 *
 * AFTER:
 * - Let User.create() attempt to save
 * - MongoDB throws error code 11000 if duplicate
 * - handleDuplicateError catches it automatically
 * - Result: Specific error showing which field is duplicate
 *
 * ============================================
 * ERROR RESPONSE COMPARISON:
 * ============================================
 *
 * OLD WAY:
 * {
 *   "success": false,
 *   "message": "User with this email already exists",
 *   "errorSources": [
 *     { "path": "", "message": "User with this email already exists" }
 *   ]
 * }
 *
 * NEW WAY:
 * {
 *   "success": false,
 *   "message": "Duplicate Entry",
 *   "errorSources": [
 *     { "path": "email", "message": "john@test.com already exists" }
 *   ]
 * }
 *
 * BENEFITS:
 * ✅ Shows which field is duplicate (email or phone)
 * ✅ Shows the actual duplicate value
 * ✅ Consistent with other duplicate errors
 * ✅ Less code to maintain
 * ✅ Handles both email AND phone duplicates automatically
 */
//# sourceMappingURL=auth.service.d.ts.map