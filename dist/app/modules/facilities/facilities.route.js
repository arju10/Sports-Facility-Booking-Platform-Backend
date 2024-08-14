"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityRouters = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const facilities_validation_1 = require("./facilities.validation");
const facilities_controller_1 = require("./facilities.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const users_constant_1 = require("../users/users.constant");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(users_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(facilities_validation_1.FacilityValidations.createFacilityValidationSchema), facilities_controller_1.FacilityControllers.createFacility);
router.get('/:id', facilities_controller_1.FacilityControllers.getSingleFacility);
router.put('/:id', (0, auth_1.default)(users_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(facilities_validation_1.FacilityValidations.updateFacilityValidationSchema), facilities_controller_1.FacilityControllers.updateFacility);
router.delete('/:id', (0, auth_1.default)(users_constant_1.USER_ROLE.admin), facilities_controller_1.FacilityControllers.deleteSingleFacility);
router.get('/', facilities_controller_1.FacilityControllers.getAllFacilities);
exports.FacilityRouters = router;
