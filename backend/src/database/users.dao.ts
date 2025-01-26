import { IUser } from "../types/mongo/IUser.ts";
import { UserModel } from "../models/user.model.ts";
import { MongoDAO } from "./mongo.dao.ts";

class UserDAO extends MongoDAO<IUser> {
  getByEmail = async (email: string) => {
    try {
      const result = await this.model.findOne({ email });

      if (!result) throw new Error(`Not found (searched email: ${email})`);

      return { status: "success", payload: result };
    } catch (err) {
      return { status: "error", error: err };
    }
  };
}

export const userDAO = new UserDAO(UserModel);
