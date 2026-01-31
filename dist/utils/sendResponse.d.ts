import { Response } from "express";
interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T;
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    token?: string;
}
declare const sendResponse: <T>(res: Response, data: ApiResponse<T>) => void;
export default sendResponse;
//# sourceMappingURL=sendResponse.d.ts.map