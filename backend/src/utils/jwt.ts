import "dotenv/config";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/env.config.js";

export class AccessToken {
  static generateToken = (user: string | Buffer | object) =>
    jwt.sign(user, envConfig.jwtSecret, {
      expiresIn: 30 * 24 * 60 * 60 * 1000,
    });

  static validateToken = (token: string) =>
    jwt.verify(token, envConfig.jwtSecret);
}
