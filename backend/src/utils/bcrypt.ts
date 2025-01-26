import bcrypt from "bcrypt";

const saltRounds = 10;

export class Encryption {
  static createHash(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
  }

  static validatePassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
}
