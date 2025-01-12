import { Request, Response, NextFunction } from "express";
import { IReport } from "../types/mongo/IReport.ts";
import { reportService } from "../services/reports.service.ts";
import { RequestParams } from "../types/express/RequestParams.ts";
import { logger } from "../utils/logger.ts";

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
    req: Request,
    res: Response<IReport[]>,
    next: NextFunction
  ) => {
    try {
      const result = await reportService.getAll();
      logger.http(`Reports found succesfully`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  getReportById = async (
    req: Request<RequestParams>,
    res: Response<IReport>,
    next: NextFunction
  ) => {
    try {
      logger.http(`Report found succesfully (ID: ${req.params.id})`);
      res.status(200).send(req.report);
    } catch (err) {
      next(err);
    }
  };

  createReport = async (
    req: Request<{}, IReport, IReport>,
    res: Response<IReport>,
    next: NextFunction
  ) => {
    try {
      const result = await reportService.create(req.body);
      logger.http(`Report created succesfully`);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  };

  updateReport = async (
    req: Request<RequestParams, IReport, IReport>,
    res: Response<IReport>,
    next: NextFunction
  ) => {
    try {
      const result = await reportService.update(req.params.id, req.body);
      logger.http(`Report updated successfully (ID: ${req.params.id})`);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  };

  deleteReport = async (
    req: Request<RequestParams>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await reportService.delete(req.params.id);
      logger.http(`Report deleted successfully (ID was ${req.params.id})`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };
}
