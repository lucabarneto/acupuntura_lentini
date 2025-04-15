import passport from "passport";
import { loginStrategy } from "./strategies/login.strategy.js";
import { jwtStrategy } from "./strategies/jwt.strategy.js";

export const initializePassport = () => {
  passport.use("login", loginStrategy);

  passport.use("jwt", jwtStrategy);
};
