"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const user_model_1 = require("../modules/user/user.model");
const auth = (...requiredRoles) => {
    return async (req, res, next) => {
        try {
            // Get token from authorization header
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized to access this route");
            }
            const token = authHeader.substring(7); // Remove 'Bearer ' prefix
            // Verify token
            let decoded;
            try {
                decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
            }
            catch (error) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid or expired token");
            }
            const { userId, role } = decoded;
            // Check if user exists
            const user = await user_model_1.User.findById(userId);
            if (!user) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
            }
            // Check if user has required role
            if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
                throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You do not have permission to access this route");
            }
            // Check if password was changed after token was issued
            if (user.passwordChangedAt && decoded.iat) {
                const passwordChangedTime = Math.floor(user.passwordChangedAt.getTime() / 1000);
                if (passwordChangedTime > decoded.iat) {
                    throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Password was changed recently. Please login again");
                }
            }
            // Attach user to request
            req.user = decoded;
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.default = auth;
//# sourceMappingURL=auth.js.map