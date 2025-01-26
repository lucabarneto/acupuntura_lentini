import { Strategy as LocalStrategy } from "passport-local";
import { userService } from "../../services/users.service.ts";
import { Encryption } from "../../utils/bcrypt.ts";

type DataSafeUser = {
  first_name: string;
  last_name: string;
  role: "admin" | "user";
};

export const loginStrategy = new LocalStrategy(
  { usernameField: "email" },
  async (username, password, done) => {
    try {
      const result = await userService.getByEmail(username);

      Encryption.validatePassword(password, result!.password);

      const user: DataSafeUser = {
        first_name: result!.first_name,
        last_name: result!.last_name,
        role: result!.role,
      };

      done(null, user);
    } catch (err) {
      done(err);
    }
  }
);
