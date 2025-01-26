import { Request, Response, NextFunction } from "express";
import passport from "passport";

export const authenticate = (
  strategy: "login" | "jwt",
  options: passport.AuthenticateOptions
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      strategy,
      options,
      function (error: any, user: Express.User | false | null) {
        try {
          if (error) throw error;

          if (!user) throw new Error("Unauthenticated");

          req.user = user!;

          next();
        } catch (err) {
          next(err);
        }
      }
    )(req, res, next);
  };
};
