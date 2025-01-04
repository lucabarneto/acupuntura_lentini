import { Request, Response, NextFunction } from "express";
import Resource from "../services/resources.service.ts";
import IResource from "../interfaces/IResource.interface.ts";
import RequestParams from "../interfaces/RequestParams.interface.ts";
import { logger } from "../utils/logger.ts";

const resource = new Resource();

export default class ResourceController {
  getAllResources = async (
    req: Request,
    res: Response<IResource[]>,
    next: NextFunction
  ) => {
    try {
      const result = await resource.getAll();
      logger.http(`Resources found succesfully`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  getResourceById = async (
    req: Request<RequestParams>,
    res: Response<IResource>,
    next: NextFunction
  ) => {
    try {
      const result = await resource.getById(req.params.id);
      logger.http(`Resource found succesfully (ID: ${req.params.id})`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  createResource = async (
    req: Request<{}, {}, IResource>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await resource.create(req.body);
      logger.http(`Resource created succesfully`);

      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  };

  updateResource = async (
    req: Request<RequestParams, IResource, IResource>,
    res: Response<IResource>,
    next: NextFunction
  ) => {
    try {
      const result = await resource.update(req.params.id, req.body);
      logger.http(`Resource updated successfully (ID: ${req.params.id})`);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  };

  deleteResource = async (
    req: Request<RequestParams>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await resource.delete(req.params.id);
      logger.http(`Resource deleted successfully (ID was ${req.params.id})`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };
}
