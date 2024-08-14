"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../error/AppError"));
const users_model_1 = require("../modules/users/users.model");
const config_1 = __importDefault(require("../../config"));
const auth = (...requiredRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return next(new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!'));
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
            const { userId, role, iat } = decoded;
            const issuedAt = iat;
            const user = yield users_model_1.User.isUserExistsById(userId);
            if (!user) {
                return next(new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found!'));
            }
            if (user.passwordChangedAt &&
                users_model_1.User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, issuedAt)) {
                return next(new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!'));
            }
            if (requiredRoles.length && !requiredRoles.includes(role)) {
                return next(new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You do not have access to this route!'));
            }
            req.user = { userId, role };
            next();
        }
        catch (error) {
            next(new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid or expired token!'));
        }
    });
};
exports.default = auth;
