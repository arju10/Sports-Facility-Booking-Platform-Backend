import mongoose from "mongoose";
import { ZodError } from "zod";
interface ErrorSource {
    path: string | number;
    message: string;
}
interface ErrorResponse {
    statusCode: number;
    message: string;
    errorSources: ErrorSource[];
}
export declare const handleZodError: (error: ZodError) => ErrorResponse;
export declare const handleValidationError: (error: mongoose.Error.ValidationError) => ErrorResponse;
export declare const handleCastError: (error: mongoose.Error.CastError) => ErrorResponse;
export declare const handleDuplicateError: (error: any) => ErrorResponse;
export {};
//# sourceMappingURL=errorHandlers.d.ts.map