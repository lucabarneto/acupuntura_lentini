import mongoose from "mongoose";
import { IUser } from "../types/mongo/IUser.ts";
import { EMAIL_REGEX } from "../constants.ts";

type UserModel = mongoose.Model<IUser>;

const USER_COLLECTION = "users";

const UserSchema = new mongoose.Schema<IUser, UserModel>({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  email: {
    type: String,
    required: true,
    match: EMAIL_REGEX,
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserModel = mongoose.model<IUser, UserModel>(
  USER_COLLECTION,
  UserSchema
);
