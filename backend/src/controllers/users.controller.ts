import { Request, Response, NextFunction } from "express";
import { IUser } from "../types/mongo/IUser.js";
import { userService } from "../services/users.service.js";
import { RequestParams } from "../types/express/RequestParams.js";
import { logger } from "../utils/logger.js";
import { Encryption } from "../utils/bcrypt.js";
import { SuccessResponse } from "../types/express/Response.js";

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
    req: Request,
    res: Response<SuccessResponse<IUser[]>>,
    next: NextFunction
  ) => {
    try {
      const result = await userService.getAll();
      logger.http(`Users found succesfully`);
      res
        .status(200)
        .send({ status: "success", statusCode: 200, payload: result });
    } catch (err) {
      next(err);
    }
  };

  getUserById = async (
    req: Request<RequestParams>,
    res: Response<SuccessResponse<IUser>>,
    next: NextFunction
  ) => {
    try {
      logger.http(`User found succesfully (ID: ${req.params.id})`);
      res
        .status(200)
        .send({ status: "success", statusCode: 200, payload: req.myUser! });
    } catch (err) {
      next(err);
    }
  };

  createUser = async (
    req: Request<{}, SuccessResponse<IUser>, IUser>,
    res: Response<SuccessResponse<IUser>>,
    next: NextFunction
  ) => {
    try {
      req.body.password = Encryption.createHash(req.body.password);

      const result = await userService.create(req.body);
      logger.http(`User created succesfully`);
      res
        .status(201)
        .send({ status: "success", statusCode: 201, payload: result });
    } catch (err) {
      next(err);
    }
  };

  updateUser = async (
    req: Request<RequestParams, SuccessResponse<IUser>, IUser>,
    res: Response<SuccessResponse<IUser>>,
    next: NextFunction
  ) => {
    try {
      const result = await userService.update(req.params.id, req.body);
      logger.http(`User updated successfully (ID: ${req.params.id})`);
      res
        .status(201)
        .send({ status: "success", statusCode: 201, payload: result });
    } catch (err) {
      next(err);
    }
  };

  deleteUser = async (
    req: Request<RequestParams>,
    res: Response<SuccessResponse<{}>>,
    next: NextFunction
  ) => {
    try {
      const result = await userService.delete(req.params.id);
      logger.http(`User deleted successfully (ID was ${req.params.id})`);
      res
        .status(200)
        .send({ status: "success", statusCode: 200, payload: result });
    } catch (err) {
      next(err);
    }
  };
}
