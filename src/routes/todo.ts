import express from "express";
import { body, param } from "express-validator";
import { addTodo, deleteTodo, getTodo, updateTodo } from "../controllers/todo";
import { isAuth } from "../middlewares/isAuth";

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

router.get(
  "/:todoId",
  isAuth,
  param("todoId").isLength({ min: 24, max: 24 }),
  getTodo
);

router.delete("/:todoId", isAuth, deleteTodo);

export default router;
