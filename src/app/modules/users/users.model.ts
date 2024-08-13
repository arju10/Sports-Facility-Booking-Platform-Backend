import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './users.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    phone: { type: String, required: true, unique: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    address: { type: String, required: true },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  const user = this;
  // Hashing Password
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});

// Static method for checking if the user exists by email
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await this.findOne({ email }).select('+password');
};

// Static method for checking if passwords are matched
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// Static method for checking if JWT is issued before password was changed
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

// Create the User model using the UserModel interface
export const User = model<TUser, UserModel>('User', userSchema);
