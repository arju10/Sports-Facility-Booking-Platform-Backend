"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    res.status(data.statusCode).json({
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        ...(data.token && { token: data.token }),
        ...(data.meta && { meta: data.meta }),
        ...(data.data !== undefined && { data: data.data }),
    });
};
exports.default = sendResponse;
//# sourceMappingURL=sendResponse.js.map