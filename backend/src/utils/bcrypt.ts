import bcrypt from "bcrypt";
import { AuthenticationError } from "../services/errors/authentication.error.ts";

const saltRounds = 10;

export class Encryption {
  static createHash(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
  }

  static validatePassword(password: string, hash: string): void {
    const result = bcrypt.compareSync(password, hash);

    if (!result) throw new AuthenticationError("Incorrect Password");
  }
}
