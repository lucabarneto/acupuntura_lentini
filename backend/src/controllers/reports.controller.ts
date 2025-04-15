import { Request, Response, NextFunction } from "express";
import { IReport } from "../types/mongo/IReport.js";
import { reportService } from "../services/reports.service.js";
import { RequestParams } from "../types/express/RequestParams.js";
import { RequestQueries } from "../types/express/RequestQueries.js";
import { logger } from "../utils/logger.js";
import { SortQueries } from "../types/general/SortQueries.js";
import { SuccessResponse } from "../types/express/Response.js";

export class ReportController {
  handleId = async (
    req: Request,
    res: Response,
    next: NextFunction,
    id: string
  ) => {
    try {
      logger.debug("Checking for existing ID");
      req.report = await reportService.getById(id);
      next();
    } catch (err) {
      next(err);
    }
  };

  getAllReports = async (
    req: Request<RequestQueries>,
    res: Response<SuccessResponse<IReport[]>>,
    next: NextFunction
  ) => {
    try {
      const sort = req.query.creation_date
        ? ({ creation_date: req.query.creation_date } as SortQueries)
        : undefined;

      const result = await reportService.getAll(sort);
      logger.http(`Reports found succesfully`);
      res
        .status(200)
        .send({ status: "success", statusCode: 200, payload: result });
    } catch (err) {
      next(err);
    }
  };

  getReportById = async (
    req: Request<RequestParams>,
    res: Response<SuccessResponse<IReport>>,
    next: NextFunction
  ) => {
    try {
      logger.http(`Report found succesfully (ID: ${req.params.id})`);
      res
        .status(200)
        .send({ status: "success", statusCode: 200, payload: req.report! });
    } catch (err) {
      next(err);
    }
  };

  createReport = async (
    req: Request<{}, SuccessResponse<IReport>, IReport>,
    res: Response<SuccessResponse<IReport>>,
    next: NextFunction
  ) => {
    try {
      const result = await reportService.create(req.body);
      logger.http(`Report created succesfully`);
      res
        .status(201)
        .send({ status: "success", statusCode: 201, payload: result });
    } catch (err) {
      next(err);
    }
  };

  updateReport = async (
    req: Request<RequestParams, SuccessResponse<IReport>, IReport>,
    res: Response<SuccessResponse<IReport>>,
    next: NextFunction
  ) => {
    try {
      const result = await reportService.update(req.params.id, req.body);
      logger.http(`Report updated successfully (ID: ${req.params.id})`);
      res
        .status(201)
        .send({ status: "success", statusCode: 201, payload: result });
    } catch (err) {
      next(err);
    }
  };

  deleteReport = async (
    req: Request<RequestParams>,
    res: Response<SuccessResponse<{}>>,
    next: NextFunction
  ) => {
    try {
      const result = await reportService.delete(req.params.id);
      logger.http(`Report deleted successfully (ID was ${req.params.id})`);
      res
        .status(200)
        .send({ status: "success", statusCode: 200, payload: result });
    } catch (err) {
      next(err);
    }
  };
}
