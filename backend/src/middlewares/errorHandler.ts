import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.ts";
import { ZodError } from "zod";
import { ErrorResponse } from "../interfaces/ErrorResponse.interface.ts";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) => {
  logger.error(err instanceof ZodError ? err.issues[0].message : err.message);

  const statusCode = err instanceof ZodError ? 422 : 500;
  res.status(statusCode).send({
    status: "error",
    statusCode: statusCode,
    message: err instanceof ZodError ? err.issues[0].message : err.message,
  });
};
