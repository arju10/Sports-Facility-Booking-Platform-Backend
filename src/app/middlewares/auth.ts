import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import AppError from '../error/AppError';
import { User } from '../modules/users/users.model';
import config from '../../config';

const auth = (...requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; 
    
    if (!token) {
      return next(
        new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!'),
      );
    }

    try {
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
  
      const { userId, role, iat } = decoded;
      const issuedAt = iat as number; 

      const user = await User.isUserExistsById(userId); 

      if (!user) {
        return next(
          new AppError(httpStatus.NOT_FOUND, 'This user is not found!'),
        );
      }

      if (
        user.passwordChangedAt &&
        User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, issuedAt)
      ) {
        return next(
          new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!'),
        );
      }

      if (requiredRoles.length && !requiredRoles.includes(role)) {
        return next(
          new AppError(
            httpStatus.UNAUTHORIZED,
            'You do not have access to this route!',
          ),
        );
      }

      req.user = { userId, role };
      next();
    } catch (error) {
      next(new AppError(httpStatus.UNAUTHORIZED, 'Invalid or expired token!'));
    }
  };
};

export default auth;
