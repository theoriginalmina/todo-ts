import { Response } from "express";
import { validationResult } from "express-validator";
import { HydratedDocument } from "mongoose";
import { ITodo, TodoRequest } from "../interfaces";
import Todo from "../models/todo";

export const addTodo = async (req: TodoRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { userId } = req.session;
  const { title, description } = req.body;

  const todo: HydratedDocument<ITodo> = new Todo({
    userId,
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

  return res.status(201).json({
    todo
  });
};

export const updateTodo = async (req: TodoRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, description } = req.body;
  const { todoId } = req.params;

  const todo = await Todo.findOne({ _id: todoId });

  if (!todo) {
    return res.status(404).json({
      message: "Todo was not found"
    });
  }

  todo.title = title;
  todo.description = description;
  try {
    await todo.save();
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }

  return res.status(200).json({
    message: "Updated successfully",
    todo
  });
};

export const deleteTodo = async (req: TodoRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { todoId } = req.params;

  const todo = await Todo.findOne({ _id: todoId });

  if (!todo) {
    return res.status(404).json({
      message: "Todo was not found"
    });
  }

  try {
    await todo.delete();
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }

  return res.status(200).json({
    message: "Deleted successfully"
  });
};

export const getTodo = async (req: TodoRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { userId } = req.session;
  const { todoId } = req.params;

  const todo = await Todo.findOne({ _id: todoId, userId });

  if (!todo) {
    return res.status(404).json({
      message: "Todo was not found"
    });
  }

  return res.status(200).json({
    todo
  });
};
