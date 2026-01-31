import { Model, Types } from "mongoose";
export interface IUser {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    phone: string;
    role: "admin" | "user";
    address: string;
    passwordChangedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IUserMethods {
    isPasswordMatched(plainPassword: string, hashedPassword: string): Promise<boolean>;
}
export interface UserModel extends Model<IUser, Record<string, never>, IUserMethods> {
    isUserExistsByEmail(email: string): Promise<IUser | null>;
    isUserExistsById(id: string): Promise<IUser | null>;
    isPasswordMatched(plainPassword: string, hashedPassword: string): Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(passwordChangedTimestamp: Date, jwtIssuedTimestamp: number): boolean;
}
//# sourceMappingURL=user.interface.d.ts.map