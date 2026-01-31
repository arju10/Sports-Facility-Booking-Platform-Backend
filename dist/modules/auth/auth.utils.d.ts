export interface JWTPayload {
    userId: string;
    role: string;
}
export declare const createToken: (payload: JWTPayload, secret: string, expiresIn: string) => string;
export declare const verifyToken: (token: string, secret: string) => JWTPayload;
//# sourceMappingURL=auth.utils.d.ts.map