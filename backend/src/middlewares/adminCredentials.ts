import { Request, Response, NextFunction } from "express";
import { AuthorizationError } from "../services/errors/authorization.error";

export const adminCredentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user!.role === "admin") {
      next();
    } else {
      throw new AuthorizationError(
        "User was unauthorized to complete the request"
      );
    }
  } catch (err) {
    next(err);
  }
};
