"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const facility_validation_1 = require("./facility.validation");
const facility_controller_1 = require("./facility.controller");
const router = express_1.default.Router();
// Create facility (Admin only)
router.post("/", (0, auth_1.default)("admin"), (0, validateRequest_1.default)(facility_validation_1.FacilityValidation.createFacilityValidationSchema), facility_controller_1.FacilityController.createFacility);
// Get all facilities (Public)
router.get("/", facility_controller_1.FacilityController.getAllFacilities);
// Get single facility (Public)
router.get("/:id", facility_controller_1.FacilityController.getFacilityById);
// Update facility (Admin only)
router.put("/:id", (0, auth_1.default)("admin"), (0, validateRequest_1.default)(facility_validation_1.FacilityValidation.updateFacilityValidationSchema), facility_controller_1.FacilityController.updateFacility);
// Delete facility (Admin only)
router.delete("/:id", (0, auth_1.default)("admin"), facility_controller_1.FacilityController.deleteFacility);
exports.FacilityRoutes = router;
//# sourceMappingURL=facility.routes.js.map