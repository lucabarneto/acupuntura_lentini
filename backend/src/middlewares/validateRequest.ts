import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { customZodError } from "../utils/customZodError";

interface RequestValidators {
  body?: AnyZodObject;
  params?: AnyZodObject;
  query?: AnyZodObject;
}

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
