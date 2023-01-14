import "dotenv/config";
import express, { Response } from "express";
import mongoose from "mongoose";
import { mongoUrl, cookieSecret } from "./config";
import todo from "./routes/todo";
import user from "./routes/user";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);
mongoose
  .connect(mongoUrl)
  .then(() => console.log("Connected successfully To MongoDB"))
  .catch((err) => {
    console.log(err);
  });

const sessionStore = new MongoStore({
  mongoUrl: mongoUrl,
  collectionName: "sessions"
});

app.set("trust proxy", 1);
app.use(
  session({
    name: "sid",
    secret: cookieSecret,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    }
  })
);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.get("/", (_, res: Response) => {
  res.send("To Do App");
});

app.use("/api/v1/todos", todo);
app.use("/api/v1/users", user);

// express-session deprecated req.secret; provide secret option
