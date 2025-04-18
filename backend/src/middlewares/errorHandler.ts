import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ErrorResponse } from "../types/express/Response.js";
import { CustomError } from "../types/general/Error.interface.js";
import { logger } from "../utils/logger.js";

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) => {
  logger.error(err instanceof ZodError ? err.issues[0].message : err.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).send({
    status: "error",
    statusCode: statusCode,
    name: err.name,
    message: err instanceof ZodError ? err.issues[0].message : err.message,
  });
};
