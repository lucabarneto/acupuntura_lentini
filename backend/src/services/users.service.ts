import { IUser } from "../types/mongo/IUser";
import { userDAO } from "../database/users.dao";
import { BaseService } from "./base.service";

class UserService extends BaseService<IUser> {
  findEqual = (data: IUser, users: IUser[]): boolean =>
    users.some((user) => user.email === data.email);

  getByEmail = async (email: string): Promise<IUser> => {
    const result = await userDAO.getByEmail(email);

    if (result.status === "error") throw result.error;

    return result.payload;
  };
}

export const userService = new UserService(userDAO);
