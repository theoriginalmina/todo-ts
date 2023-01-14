import express from "express";
import { isAuth } from "../middlewares/isAuth";
import { addTodo, updateTodo, deleteTodo, getTodo } from "../controllers/todo";
import { body, param } from "express-validator";

const router = express.Router();

router.post(
  "/",
  isAuth,
  body("title")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Title can't be empty"),
  addTodo
);

router.put(
  "/:todoId",
  isAuth,
  body("title")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Title can't be empty"),
  updateTodo
);

router.delete("/:todoId", isAuth, deleteTodo);

router.get(
  "/:todoId",
  isAuth,
  param("todoId").isLength({ min: 24, max: 24 }),
  getTodo
);

export default router;
