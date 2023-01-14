import { hash, verify } from "argon2";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { HydratedDocument } from "mongoose";
import { IUser, UserRequest } from "../interfaces";
import User from "../models/user";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

export const registerUser = async (req: UserRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  const hashedPassword = await hash(password);

  const user: HydratedDocument<IUser> = new User({
    email,
    password: hashedPassword
  });

  try {
    await user.save();
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }

  return res.status(201).json({
    created: true
  });
};

export const loginUser = async (req: UserRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      error: "This email is not registered"
    });
  }

  const valid = await verify(user.password, password);

  if (!valid) {
    return res.status(401).json({
      error: "Wrong Password"
    });
  }
  const userId = JSON.stringify(user._id).replace(/"/g, "");
  req.session.userId = userId;

  return res.status(200).json({
    id: userId,
    email: user.email
  });
};

export const logoutUser = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(400).json({
        message: err.message
      });
    }
    return res.status(200).json({
      message: "Logged out successfully"
    });
  });
};
