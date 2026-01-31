import jwt from "jsonwebtoken";

export interface JWTPayload {
  userId: string;
  role: string;
}

export const createToken = (
  payload: JWTPayload,
  secret: string,
  expiresIn: string,
): string => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string): JWTPayload => {
  return jwt.verify(token, secret) as JWTPayload;
};
