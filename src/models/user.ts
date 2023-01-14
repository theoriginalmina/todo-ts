import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IUser {
  email: string;
  password: string;
}

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
