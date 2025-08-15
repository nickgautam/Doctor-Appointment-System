import { applyForDoctor } from "../controllers/doctorController.js";
import { authentication } from "../middleware/auth.js";
import express from "express";
import { body } from "express-validator";
import { throwError } from "../middleware/errorMiddleware.js";
const router = express.Router();

router.post(
  "/apply-for-doctor",
  authentication,
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .bail()
    .not()
    .isInt()
    .withMessage("Invalid first name"),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .bail()
    .not()
    .isInt()
    .withMessage("Invalid last name"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required")
    .bail()
    .isMobilePhone()
    .withMessage("Invalid phone number"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email"),
  body("website")
    .trim()
    .optional()
    .custom((value) => {
      if (value && !isNaN(value)) {
        throw new Error("Invalid website");
      }
      return true;
    }),
  body("address")
    .trim()
    .notEmpty()
    .withMessage("address is required")
    .bail()
    .not()
    .isInt()
    .withMessage("Invalid address"),
  body("specialization")
    .trim()
    .notEmpty()
    .withMessage("specialization is required")
    .bail()
    .not()
    .isInt()
    .withMessage("Invalid specialization"),
  body("experience")
    .trim()
    .notEmpty()
    .withMessage("experience is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Invalid experience. It must be atleast 1 year"),
  body("feesPerConsultation")
    .trim()
    .notEmpty()
    .withMessage("Consultation fee is required")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Invalid consultation fee"),
  body("timing")
    .notEmpty()
    .withMessage("Timing is required")
    .bail()
    .custom((value) => {
      if (typeof value !== "object") {
        throw new Error("Invalid format of timing");
      }
      if (!value.from) {
        throw new Error("Timing from is required");
      }
      if (value.from && typeof value.from !== "string") {
        throw new Error("Invalid Timing from");
      }
      if (!value.to) {
        throw new Error("Timing to is required");
      }
      if (value.to && typeof value.to !== "string") {
        throw new Error("Invalid Timing to");
      }
      return true;
    }),
  throwError,
  applyForDoctor
);

export default router;
