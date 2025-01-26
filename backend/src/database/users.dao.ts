import { IUser } from "../types/mongo/IUser.ts";
import { UserModel } from "../models/user.model.ts";
import { MongoDAO } from "./mongo.dao.ts";

class UserDAO extends MongoDAO<IUser> {}

export const userDAO = new UserDAO(UserModel);
