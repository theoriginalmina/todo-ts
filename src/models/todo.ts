import mongoose from "mongoose";
import { ITodo } from "../interfaces";

const Schema = mongoose.Schema;

const TodoSchema = new Schema<ITodo>({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

const Todo = mongoose.model("todo", TodoSchema);

export default Todo;
