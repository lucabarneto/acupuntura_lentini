import { Strategy as LocalStrategy } from "passport-local";
import { userService } from "../../services/users.service.js";
import { Encryption } from "../../utils/bcrypt.js";
import { IUser } from "../../types/mongo/IUser.js";
import { logger } from "../../utils/logger.js";

type DataSafeUser = {
  first_name: string;
  last_name: string;
  role: "admin" | "user";
};

export const loginStrategy = new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      const user = await getUser(email, password);

      done(null, user);
    } catch (err) {
      done(err);
    }
  }
);

const getUser = async (
  email: string,
  password: string
): Promise<DataSafeUser> => {
  try {
    const user = await validateUser(email, password);
    return createDataSafeUser(user);
  } catch (err) {
    throw err;
  }
};

const validateUser = async (
  email: string,
  password: string
): Promise<IUser> => {
  const result = await userService.getByEmail(email);
  logger.debug("Usuario encontrado en la base de datos");
  Encryption.validatePassword(password, result!.password);
  logger.debug("Contraseña correcta");

  return result as IUser;
};

const createDataSafeUser = (user: IUser): DataSafeUser => {
  const dataSafeUser: DataSafeUser = {
    first_name: user!.first_name,
    last_name: user!.last_name,
    role: user!.role,
  };

  return dataSafeUser;
};
