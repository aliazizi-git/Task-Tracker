import { body } from "express-validator";
import handleValidation from "../../Utils/handleValidation.js";

export const registerValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username is required")
    .isLength({ max: 100 })
    .withMessage("max length of username is 100 characters"),
  
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long")
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .withMessage(
      "password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  
  handleValidation,
];

export const loginValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username is required"),
  
  body("password")
    .notEmpty()
    .withMessage("password is required"),
  
  handleValidation,
];