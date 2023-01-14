import mongoose from "mongoose";
import { IUser } from "../interfaces";

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model("user", UserSchema);

export default User;
