import express from "express";
import { registerUser, loginUser } from "../controllers/user";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/register",
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").isLength({ min: 5 }).withMessage("Short Password"),
  registerUser
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").isLength({ min: 5 }).withMessage("Wrong Password"),
  loginUser
);

export default router;
