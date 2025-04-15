import { Request, Response, NextFunction } from "express";
import { ITemplate } from "../types/mongo/ITemplate.js";
import { templateService } from "../services/templates.service.js";
import { RequestParams } from "../types/express/RequestParams.js";
import { logger } from "../utils/logger.js";
import { SuccessResponse } from "../types/express/Response.js";

export class TemplateController {
  handleId = async (
    req: Request,
    res: Response,
    next: NextFunction,
    id: string
  ) => {
    try {
      logger.debug("Checking for existing ID");
      req.template = await templateService.getById(id);
      next();
    } catch (err) {
      next(err);
    }
  };

  getAllTemplates = async (
    req: Request,
    res: Response<SuccessResponse<ITemplate[]>>,
    next: NextFunction
  ) => {
    try {
      const result = await templateService.getAll();
      logger.http(`Templates found succesfully`);
      res
        .status(200)
        .send({ status: "success", statusCode: 200, payload: result });
    } catch (err) {
      next(err);
    }
  };

  getTemplateById = async (
    req: Request<RequestParams>,
    res: Response<SuccessResponse<ITemplate>>,
    next: NextFunction
  ) => {
    try {
      logger.http(`Template found succesfully (ID: ${req.params.id})`);
      res
        .status(200)
        .send({ status: "success", statusCode: 200, payload: req.template! });
    } catch (err) {
      next(err);
    }
  };

  createTemplate = async (
    req: Request<{}, SuccessResponse<ITemplate>, ITemplate>,
    res: Response<SuccessResponse<ITemplate>>,
    next: NextFunction
  ) => {
    try {
      const result = await templateService.create(req.body);
      logger.http(`Template created succesfully`);

      res
        .status(201)
        .send({ status: "success", statusCode: 201, payload: result });
    } catch (err) {
      next(err);
    }
  };

  updateTemplate = async (
    req: Request<RequestParams, SuccessResponse<ITemplate>, ITemplate>,
    res: Response<SuccessResponse<ITemplate>>,
    next: NextFunction
  ) => {
    try {
      const result = await templateService.update(req.params.id, req.body);
      logger.http(`Template updated successfully (ID: ${req.params.id})`);
      res
        .status(201)
        .send({ status: "success", statusCode: 201, payload: result });
    } catch (err) {
      next(err);
    }
  };

  deleteTemplate = async (
    req: Request<RequestParams>,
    res: Response<SuccessResponse<{}>>,
    next: NextFunction
  ) => {
    try {
      const result = await templateService.delete(req.params.id);
      logger.http(`Template deleted successfully (ID was ${req.params.id})`);
      res
        .status(200)
        .send({ status: "success", statusCode: 200, payload: result });
    } catch (err) {
      next(err);
    }
  };
}
