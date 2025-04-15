import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.js";
import { AccessToken } from "../utils/jwt.js";

export class SessionController {
  logUserIn = (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = AccessToken.generateToken(req.user!);

      res.cookie("authCookie", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: true, // disable this property when developing
        sameSite: "none", // change to lax when developing
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
