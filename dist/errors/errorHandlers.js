"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateError = exports.handleCastError = exports.handleValidationError = exports.handleZodError = void 0;
// Handle Zod validation errors
const handleZodError = (error) => {
    const errorSources = error.issues.map((issue) => ({
        path: issue.path[issue.path.length - 1],
        message: issue.message,
    }));
    return {
        statusCode: 400,
        message: "Validation Error",
        errorSources,
    };
};
exports.handleZodError = handleZodError;
// Handle Mongoose validation errors
const handleValidationError = (error) => {
    const errorSources = Object.values(error.errors).map((err) => ({
        path: err.path,
        message: err.message,
    }));
    return {
        statusCode: 400,
        message: "Validation Error",
        errorSources,
    };
};
exports.handleValidationError = handleValidationError;
// Handle Mongoose cast errors (invalid ObjectId, etc.)
const handleCastError = (error) => {
    const errorSources = [
        {
            path: error.path,
            message: error.message,
        },
    ];
    return {
        statusCode: 400,
        message: "Invalid ID",
        errorSources,
    };
};
exports.handleCastError = handleCastError;
// Handle duplicate key errors
const handleDuplicateError = (error) => {
    const match = error.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorSources = [
        {
            path: Object.keys(error.keyValue)[0],
            message: `${extractedMessage} already exists`,
        },
    ];
    return {
        statusCode: 400,
        message: "Duplicate Entry",
        errorSources,
    };
};
exports.handleDuplicateError = handleDuplicateError;
//# sourceMappingURL=errorHandlers.js.map