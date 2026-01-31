"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
// Signup controller
const signup = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthService.signup(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "User registered successfully",
        token: result.token,
        data: result.user,
    });
});
// Login controller
const login = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthService.login(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User logged in successfully",
        token: result.token,
        data: result.user,
    });
});
// Change password controller
const changePassword = (0, catchAsync_1.default)(async (req, res) => {
    await auth_service_1.AuthService.changePassword(req.user, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Password changed successfully",
        data: null,
    });
});
exports.AuthController = {
    signup,
    login,
    changePassword,
};
//# sourceMappingURL=auth.controller.js.map