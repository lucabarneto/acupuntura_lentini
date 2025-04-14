import { Request, Response, NextFunction } from "express";
import { IResource } from "../types/mongo/IResource";
import { resourceService } from "../services/resources.service";
import { RequestParams } from "../types/express/RequestParams";
import { logger } from "../utils/logger";
import { SuccessResponse } from "../types/express/Response";

export class ResourceController {
  handleId = async (
    req: Request,
    res: Response,
    next: NextFunction,
    id: string
  ) => {
    try {
      logger.debug("Checking for existing ID");
      req.resource = await resourceService.getById(id);
      next();
    } catch (err) {
      next(err);
    }
  };

  getAllResources = async (
    req: Request,
    res: Response<SuccessResponse<IResource[]>>,
    next: NextFunction
  ) => {
    try {
      const result = await resourceService.getAll();
      logger.http(`Resources found succesfully`);
      res
        .status(200)
        .send({ status: "success", statusCode: 200, payload: result });
    } catch (err) {
      next(err);
    }
  };

  getResourceById = async (
    req: Request<RequestParams>,
    res: Response<SuccessResponse<IResource>>,
    next: NextFunction
  ) => {
    try {
      logger.http(`Resource found succesfully (ID: ${req.params.id})`);
      res
        .status(200)
        .send({ status: "success", statusCode: 200, payload: req.resource! });
    } catch (err) {
      next(err);
    }
  };

  createResource = async (
    req: Request<{}, SuccessResponse<IResource>, IResource>,
    res: Response<SuccessResponse<IResource>>,
    next: NextFunction
  ) => {
    try {
      const result = await resourceService.create(req.body);
      logger.http(`Resource created succesfully`);

      res
        .status(201)
        .send({ status: "success", statusCode: 201, payload: result });
    } catch (err) {
      next(err);
    }
  };

  updateResource = async (
    req: Request<RequestParams, SuccessResponse<IResource>, IResource>,
    res: Response<SuccessResponse<IResource>>,
    next: NextFunction
  ) => {
    try {
      const result = await resourceService.update(req.params.id, req.body);
      logger.http(`Resource updated successfully (ID: ${req.params.id})`);
      res
        .status(201)
        .send({ status: "success", statusCode: 201, payload: result });
    } catch (err) {
      next(err);
    }
  };

  deleteResource = async (
    req: Request<RequestParams>,
    res: Response<SuccessResponse<{}>>,
    next: NextFunction
  ) => {
    try {
      const result = await resourceService.delete(req.params.id);
      logger.http(`Resource deleted successfully (ID was ${req.params.id})`);
      res
        .status(200)
        .send({ status: "success", statusCode: 200, payload: result });
    } catch (err) {
      next(err);
    }
  };
}
