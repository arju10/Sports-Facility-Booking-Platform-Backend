import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { FacilityValidation } from "./facility.validation";
import { FacilityController } from "./facility.controller";
import { upload } from "../../middlewares/upload";

const router = express.Router();

// Create facility (Admin only)
// router.post(
//   "/",
//   auth("admin"),
//   validateRequest(FacilityValidation.createFacilityValidationSchema),
//   FacilityController.createFacility,
// );
// Create facility with image upload
router.post(
  '/',
  auth('admin'),
  upload.single('image'), // Add this
  validateRequest(FacilityValidation.createFacilityValidationSchema),
  FacilityController.createFacility
);


// Get all facilities (Public)
router.get("/", FacilityController.getAllFacilities);

// Get single facility (Public)
router.get("/:id", FacilityController.getFacilityById);

// Update facility (Admin only)
// router.put(
//   "/:id",
//   auth("admin"),
//   validateRequest(FacilityValidation.updateFacilityValidationSchema),
//   FacilityController.updateFacility,
// );
// Update facility with optional image upload
router.put(
  '/:id',
  auth('admin'),
  upload.single('image'), // Add this
  validateRequest(FacilityValidation.updateFacilityValidationSchema),
  FacilityController.updateFacility
);


// Delete facility (Admin only)
router.delete("/:id", auth("admin"), FacilityController.deleteFacility);

export const FacilityRoutes = router;
