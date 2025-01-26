import { Request, Response, NextFunction } from "express";
import { IUser } from "../types/mongo/IUser.ts";
import { userService } from "../services/users.service.ts";
import { RequestParams } from "../types/express/RequestParams.ts";
import { RequestQueries } from "../types/express/RequestQueries.ts";
import { logger } from "../utils/logger.ts";
import { SortQueries } from "../types/general/SortQueries.ts";
import { Encryption } from "../utils/bcrypt.ts";

export class UserController {
  handleId = async (
    req: Request,
    res: Response,
    next: NextFunction,
    id: string
  ) => {
    try {
      logger.debug("Checking for existing ID");
      req.myUser = await userService.getById(id);
      next();
    } catch (err) {
      next(err);
    }
  };

  getAllUsers = async (
    req: Request<RequestQueries>,
    res: Response<IUser[]>,
    next: NextFunction
  ) => {
    try {
      const sort = req.query.first_name
        ? ({ first_name: req.query.first_name } as SortQueries)
        : req.query.next_appointment
        ? ({ next_appointment: req.query.next_appointment } as SortQueries)
        : undefined;

      const result = await userService.getAll(sort);
      logger.http(`Users found succesfully`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  getUserById = async (
    req: Request<RequestParams>,
    res: Response<IUser>,
    next: NextFunction
  ) => {
    try {
      logger.http(`User found succesfully (ID: ${req.params.id})`);
      res.status(200).send(req.myUser);
    } catch (err) {
      next(err);
    }
  };

  createUser = async (
    req: Request<{}, IUser, IUser>,
    res: Response<IUser>,
    next: NextFunction
  ) => {
    try {
      req.body.password = Encryption.createHash(req.body.password);

      const result = await userService.create(req.body);
      logger.http(`User created succesfully`);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  };

  updateUser = async (
    req: Request<RequestParams, IUser, IUser>,
    res: Response<IUser>,
    next: NextFunction
  ) => {
    try {
      const result = await userService.update(req.params.id, req.body);
      logger.http(`User updated successfully (ID: ${req.params.id})`);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  };

  deleteUser = async (
    req: Request<RequestParams>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await userService.delete(req.params.id);
      logger.http(`User deleted successfully (ID was ${req.params.id})`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };
}
