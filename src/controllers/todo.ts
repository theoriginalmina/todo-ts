import { Request, Response } from "express";
import Todo from "../models/todo";
import { HydratedDocument } from "mongoose";

interface IRequest extends Request {
  body: {
    title: string;
    description: string;
  };
}

interface ITodo {
  title: string;
  description: string;
}

export const addTodo = async (req: IRequest, res: Response) => {
  const { title, description } = req.body;

  const todo: HydratedDocument<ITodo> = new Todo({
    title,
    description
  });

  try {
    await todo.save();
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }

  return res.json({
    todo
  });
};
