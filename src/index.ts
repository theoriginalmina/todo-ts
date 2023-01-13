import "dotenv/config";
import express, { Response } from "express";
import mongoose from "mongoose";
import { mongo_uri } from "./config";
import todo from "./routes/todo";

const app = express();

app.use(express.json());

mongoose.set("strictQuery", false);
mongoose
	.connect(mongo_uri)
	.then(() => console.log("Connected!"))
	.catch((err) => {
		console.log(err);
	});

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.get("/", (_, res: Response) => {
	res.send("To Do App");
});

app.use("/api", todo);
