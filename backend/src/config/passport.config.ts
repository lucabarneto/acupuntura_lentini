import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

export const initializePassport = () => {
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
        } catch (err) {
          done(err);
        }
      }
    )
  );
};
