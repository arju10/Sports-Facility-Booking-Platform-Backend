"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(config_1.default.database_url);
        console.log("✅ Database connected successfully");
    }
    catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
// Handle connection events
mongoose_1.default.connection.on("disconnected", () => {
    console.log("⚠️  Database disconnected");
});
mongoose_1.default.connection.on("error", (error) => {
    console.error("❌ Database error:", error);
});
process.on("SIGINT", async () => {
    await mongoose_1.default.connection.close();
    console.log("Database connection closed due to app termination");
    process.exit(0);
});
//# sourceMappingURL=database.js.map