import "dotenv/config";
import jwt from "jsonwebtoken";

export class AccessToken {
  static generateToken = (user: string | Buffer | object) =>
    jwt.sign(user, process.env.SECRET_KEY!, { expiresIn: "8h" });

  static validateToken = (token: string) =>
    jwt.verify(token, process.env.SECRET_KEY!);
}
