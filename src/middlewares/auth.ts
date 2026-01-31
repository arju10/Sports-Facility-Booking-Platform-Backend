import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";
import config from "../config";
import AppError from "../errors/AppError";
import { User } from "../modules/user/user.model";

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export type TUserRole = "admin" | "user";

const auth = (...requiredRoles: TUserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get token from authorization header
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "You are not authorized to access this route",
        );
      }

      const token = authHeader.substring(7); // Remove 'Bearer ' prefix

      // Verify token
      let decoded: JwtPayload;
      try {
        decoded = jwt.verify(token, config.jwt_access_secret) as JwtPayload;
      } catch (error) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Invalid or expired token");
      }

      const { userId, role } = decoded;

      // Check if user exists
      const user = await User.findById(userId);
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
      }

      // Check if user has required role
      if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          "You do not have permission to access this route",
        );
      }

      // Check if password was changed after token was issued
      if (user.passwordChangedAt && decoded.iat) {
        const passwordChangedTime = Math.floor(
          user.passwordChangedAt.getTime() / 1000,
        );
        if (passwordChangedTime > decoded.iat) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "Password was changed recently. Please login again",
          );
        }
      }

      // Attach user to request
      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
