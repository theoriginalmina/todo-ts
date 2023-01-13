import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface ITodo {
	title: string;
	description: string;
}

const TodoSchema = new Schema<ITodo>({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
});

const Todo = mongoose.model("todo", TodoSchema);

export default Todo;
