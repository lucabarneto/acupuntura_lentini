import { envConfig } from "../env.config.js";
import { Request } from "express";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

const cookieExtractor = (req: Request) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies["authCookie"];
  }

  return token;
};

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: envConfig.jwtSecret,
  },
  async (jwt_payload, done) => {
    try {
      if (!jwt_payload) throw new Error("No jwt payload provided");

      done(null, jwt_payload);
    } catch (err) {
      done(err);
    }
  }
);
