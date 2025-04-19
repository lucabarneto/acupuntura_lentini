import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.js";
import { envConfig } from "../config/env.config.js";
import { AccessToken } from "../utils/jwt.js";

export class SessionController {
  logUserIn = (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = AccessToken.generateToken(req.user!);

      res.cookie("authCookie", accessToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: envConfig.environment === "development" ? false : true,
        sameSite: envConfig.environment === "development" ? "lax" : "none",
      });

      logger.info(`User logged in.`);

      res.send({
        status: "success",
        payload: { token: accessToken, user: req.myUser },
      });
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
