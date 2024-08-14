"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePayableAmount = void 0;
const calculatePayableAmount = (startTime, endTime, pricePerHour) => {
    const durationInHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    return durationInHours * pricePerHour;
};
exports.calculatePayableAmount = calculatePayableAmount;
