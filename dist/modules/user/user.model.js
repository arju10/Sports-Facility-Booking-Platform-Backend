"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
        minlength: [6, "Password must be at least 6 characters long"],
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        trim: true,
    },
    role: {
        type: String,
        enum: {
            values: ["admin", "user"],
            message: "{VALUE} is not a valid role",
        },
        default: "user",
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
    },
    passwordChangedAt: {
        type: Date,
    },
}, {
    timestamps: true,
    versionKey: false,
});
// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        this.password = await bcrypt_1.default.hash(this.password, config_1.default.bcrypt_salt_rounds);
        next();
    }
    catch (error) {
        next(error);
    }
});
// Remove password from JSON response
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};
// Static method: Check if user exists by email
userSchema.statics.isUserExistsByEmail = async function (email) {
    return await this.findOne({ email }).select("+password");
};
// Static method: Check if user exists by ID
userSchema.statics.isUserExistsById = async function (id) {
    return await this.findById(id).select("+password");
};
// Static method: Compare passwords
userSchema.statics.isPasswordMatched = async function (plainPassword, hashedPassword) {
    return await bcrypt_1.default.compare(plainPassword, hashedPassword);
};
// Static method: Check if JWT was issued before password change
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (passwordChangedTimestamp, jwtIssuedTimestamp) {
    const passwordChangedTime = Math.floor(passwordChangedTimestamp.getTime() / 1000);
    return passwordChangedTime > jwtIssuedTimestamp;
};
exports.User = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=user.model.js.map