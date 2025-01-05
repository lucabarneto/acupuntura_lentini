import { Request, Response, NextFunction } from "express";
import Template from "../services/templates.service.ts";
import ITemplate from "../interfaces/ITemplate.interface.ts";
import RequestParams from "../interfaces/RequestParams.interface.ts";
import { logger } from "../utils/logger.ts";

const template = new Template();

export default class TemplateController {
  getAllTemplates = async (
    req: Request,
    res: Response<ITemplate[]>,
    next: NextFunction
  ) => {
    try {
      const result = await template.getAll();
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
      const result = await template.getById(req.params.id);
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
      const result = await template.create(req.body);
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
      const result = await template.update(req.params.id, req.body);
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
      const result = await template.delete(req.params.id);
      logger.http(`Template deleted successfully (ID was ${req.params.id})`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };
}
