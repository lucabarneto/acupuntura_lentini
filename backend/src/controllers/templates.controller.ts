import { Request, Response, NextFunction } from "express";
import { ITemplate } from "../types/mongo/ITemplate.ts";
import { templateService } from "../services/templates.service.ts";
import { RequestParams } from "../types/express/RequestParams.ts";
import { logger } from "../utils/logger.ts";

export class TemplateController {
  handleId = async (
    req: Request,
    res: Response,
    next: NextFunction,
    id: string
  ) => {
    try {
      logger.debug("Checking for existing ID");
      await templateService.getById(id);
      next();
    } catch (err) {
      next(err);
    }
  };

  getAllTemplates = async (
    req: Request,
    res: Response<ITemplate[]>,
    next: NextFunction
  ) => {
    try {
      const result = await templateService.getAll();
      logger.http(`Templates found succesfully`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  getTemplateById = async (
    req: Request<RequestParams>,
    res: Response<ITemplate>,
    next: NextFunction
  ) => {
    try {
      const result = await templateService.getById(req.params.id);
      logger.http(`Template found succesfully (ID: ${req.params.id})`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  createTemplate = async (
    req: Request<{}, {}, ITemplate>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await templateService.create(req.body);
      logger.http(`Template created succesfully`);

      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  };

  updateTemplate = async (
    req: Request<RequestParams, ITemplate, ITemplate>,
    res: Response<ITemplate>,
    next: NextFunction
  ) => {
    try {
      const result = await templateService.update(req.params.id, req.body);
      logger.http(`Template updated successfully (ID: ${req.params.id})`);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  };

  deleteTemplate = async (
    req: Request<RequestParams>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await templateService.delete(req.params.id);
      logger.http(`Template deleted successfully (ID was ${req.params.id})`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };
}
