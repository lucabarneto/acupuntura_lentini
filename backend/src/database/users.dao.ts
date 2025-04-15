import { IUser } from "../types/mongo/IUser.js";
import { UserModel } from "../models/user.model.js";
import { MongoDAO } from "./mongo.dao.js";
import { DAOReturnValue } from "../types/general/Dao.interface.js";
import { AuthenticationError } from "../services/errors/authentication.error.js";

class UserDAO extends MongoDAO<IUser> {
  getByEmail = async (email: string): Promise<DAOReturnValue<IUser>> => {
    try {
      const result = await this.model.findOne({ email });

      if (!result)
        throw new AuthenticationError(
          `No user found (searched email: ${email})`
        );

      return { status: "success", payload: result as IUser };
    } catch (err) {
      return { status: "error", error: err };
    }
  };
}

export const userDAO = new UserDAO(UserModel);
