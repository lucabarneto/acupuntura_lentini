import passport from "passport";
import { loginStrategy } from "./strategies/login.strategy.ts";

export const initializePassport = () => {
  passport.use("login", loginStrategy);
};
