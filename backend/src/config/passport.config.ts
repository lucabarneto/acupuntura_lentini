import passport from "passport";
import { loginStrategy } from "./strategies/login.strategy.ts";
import { jwtStrategy } from "./strategies/jwt.strategy.ts";

export const initializePassport = () => {
  passport.use("login", loginStrategy);

  passport.use("jwt", jwtStrategy);
};
