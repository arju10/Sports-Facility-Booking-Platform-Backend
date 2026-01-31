import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}
export type TUserRole = "admin" | "user";
declare const auth: (...requiredRoles: TUserRole[]) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default auth;
//# sourceMappingURL=auth.d.ts.map