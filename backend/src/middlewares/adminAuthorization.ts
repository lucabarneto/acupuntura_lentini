import { Request, Response, NextFunction } from "express";

export const adminAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user!.role === "admin") {
      next();
    } else {
      throw new Error("User was unauthorized to complete the request");
    }
  } catch (err) {
    next(err);
  }
};
