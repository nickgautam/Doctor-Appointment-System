import { authentication, roleAuthorization } from "../middleware/auth.js";
import {
  getAllUsers,
  getAllDoctors,
  actionOnDoctorApplication,
} from "../controllers/adminController.js";
import express from "express";
import { body } from "express-validator";
import { throwError } from "../middleware/errorMiddleware.js";
const router = express.Router();

// Admin routes protected by authentication and roleAuthorization
router.get("/get-all-users", authentication, roleAuthorization, getAllUsers);

router.get(
  "/get-all-doctors",
  authentication,
  roleAuthorization,
  getAllDoctors
);

router.patch(
  "/action-on-doctor-application",
  authentication,
  roleAuthorization,
  body("doctorId")
    .trim()
    .notEmpty()
    .withMessage("Doctor id is required")
    .bail()
    .isMongoId()
    .withMessage("Invalid doctor id"),
  body("status")
    .trim()
    .notEmpty()
    .withMessage("Status is required")
    .bail()
    .isInt({ min: 1, max: 2 })
    .withMessage("Invalid status"),
  throwError,
  actionOnDoctorApplication
);

export default router;
