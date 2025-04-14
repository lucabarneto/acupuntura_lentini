import { IUser } from "../types/mongo/IUser";
import { UserModel } from "../models/user.model";
import { MongoDAO } from "./mongo.dao";
import { DAOReturnValue } from "../types/general/Dao.interface";
import { AuthenticationError } from "../services/errors/authentication.error";

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
