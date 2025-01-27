import { IUser } from "../types/mongo/IUser.ts";
import { UserModel } from "../models/user.model.ts";
import { MongoDAO } from "./mongo.dao.ts";
import { DAOReturnValue } from "../types/general/Dao.interface.ts";

class UserDAO extends MongoDAO<IUser> {
  getByEmail = async (email: string): Promise<DAOReturnValue<IUser>> => {
    try {
      const result = await this.model.findOne({ email });

      if (!result) throw new Error(`Not found (searched email: ${email})`);

      return { status: "success", payload: result as IUser };
    } catch (err) {
      return { status: "error", error: err };
    }
  };
}

export const userDAO = new UserDAO(UserModel);
