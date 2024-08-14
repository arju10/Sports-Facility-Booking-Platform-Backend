"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Application routes
const express_1 = __importDefault(require("express"));
const facilities_route_1 = require("../modules/facilities/facilities.route");
const auth_route_1 = require("../modules/auth/auth.route");
const booking_route_1 = require("../modules/booking/booking.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/facility',
        route: facilities_route_1.FacilityRouters,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/',
        route: booking_route_1.BookingRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
