import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user";
import { body } from "express-validator";
import { isAuth } from "../middlewares/isAuth";

const router = express.Router();

router.post(
  "/register",
  body("email").isEmail().normalizeEmail().withMessage("Invalid Email"),
  body("password").isLength({ min: 5 }).withMessage("Short Password"),
  registerUser
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").isLength({ min: 5 }).withMessage("Wrong Password"),
  loginUser
);

router.get("/logout", isAuth, logoutUser);

export default router;
