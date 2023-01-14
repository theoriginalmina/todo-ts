import { Request, Response } from "express";
import { hash, verify } from "argon2";
import User from "../models/user";
import { HydratedDocument } from "mongoose";
import { validationResult } from "express-validator";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

declare module "express" {
  interface Request {
    body: {
      email: string;
      password: string;
    };
  }
}

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
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

export const loginUser = async (req: Request, res: Response) => {
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
    return res.status(403).json({
      error: "Wrong Password"
    });
  }

  req.session.userId = JSON.stringify(user._id);
  return res.status(200).json({
    id: user._id,
    email: user.email
  });
};
