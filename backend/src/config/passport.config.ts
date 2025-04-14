import passport from "passport";
import { loginStrategy } from "./strategies/login.strategy";
import { jwtStrategy } from "./strategies/jwt.strategy";

export const initializePassport = () => {
  passport.use("login", loginStrategy);

  passport.use("jwt", jwtStrategy);
};
