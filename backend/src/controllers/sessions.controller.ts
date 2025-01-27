import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.ts";
import { AccessToken } from "../utils/jwt.ts";

export class SessionController {
  logUserIn = (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = AccessToken.generateToken(req.user!);

      res.cookie("authCookie", accessToken, {
        maxAge: 28800000,
        httpOnly: true,
      });

      logger.info(`User logged in.`);

      res.send({ token: accessToken });
    } catch (err) {
      next(err);
    }
  };

  logUserOut = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("authCookie").redirect("/login");
      logger.info("User logged out.");
    } catch (err) {
      next(err);
    }
  };
}
