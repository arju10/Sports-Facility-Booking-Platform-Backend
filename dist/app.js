"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Health check route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Sports Facility Booking Platform API is running",
    });
});
// API routes
app.use("/api", routes_1.default);
// Global error handler
app.use(globalErrorHandler_1.default);
// 404 Not Found handler
app.use(notFound_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map