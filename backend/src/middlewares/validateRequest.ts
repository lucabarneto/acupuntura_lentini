import { Request, Response, NextFunction } from "express";
import { customZodError } from "../utils/customZodError.ts";
import { RequestValidators } from "../interfaces/RequestValidators.interface.ts";

export const validateRequest = (validators: RequestValidators) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.body)
        req.body = await validators.body.parseAsync(req.body, {
          errorMap: customZodError,
        });
      if (validators.params)
        req.params = await validators.params.parseAsync(req.params, {
          errorMap: customZodError,
        });
      if (validators.query)
        req.query = await validators.query.parseAsync(req.query, {
          errorMap: customZodError,
        });
      next();
    } catch (err) {
      next(err);
    }
  };
};
