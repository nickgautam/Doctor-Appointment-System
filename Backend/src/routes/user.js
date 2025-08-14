import express from "express";
import { body } from "express-validator";
const router = express.Router();
import { registerUser } from "../controllers/userController.js";
import { throwError } from "../middleware/errorMiddleware.js";

router.post(
  "/register",
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .not()
    .isInt()
    .withMessage("Invalid name"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isStrongPassword()
    .withMessage("Password must be strong"),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm Password is required"),
  throwError,
  registerUser
);

export default router;
