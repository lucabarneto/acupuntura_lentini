import { Request, Response, NextFunction } from "express";
import { IChiefComplaint } from "../types/mongo/IChiefComplaint.ts";
import { chiefComplaintService } from "../services/chiefComplaints.service.ts";
import { RequestParams } from "../types/express/RequestParams.ts";
import { logger } from "../utils/logger.ts";

export class ChiefComplaintController {
  handleId = async (
    req: Request,
    res: Response,
    next: NextFunction,
    id: string
  ) => {
    try {
      logger.debug("Checking for existing ID");
      req.chief_complaint = await chiefComplaintService.getById(id);
      next();
    } catch (err) {
      next(err);
    }
  };

  getAllChiefComplaints = async (
    req: Request,
    res: Response<IChiefComplaint[]>,
    next: NextFunction
  ) => {
    try {
      const result = await chiefComplaintService.getAll();

      logger.http(`Chief Complaints found succesfully`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  getChiefComplaintById = async (
    req: Request<RequestParams>,
    res: Response<IChiefComplaint>,
    next: NextFunction
  ) => {
    try {
      const result = await chiefComplaintService.getById(req.params.id);

      logger.http(`Chief Complaint found succesfully (ID: ${req.params.id})`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  createChiefComplaint = async (
    req: Request<{}, IChiefComplaint, IChiefComplaint>,
    res: Response<IChiefComplaint>,
    next: NextFunction
  ) => {
    try {
      const result = await chiefComplaintService.create(req.body);
      logger.http(`Chief Complaint created succesfully`);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  };

  updateChiefComplaint = async (
    req: Request<RequestParams, IChiefComplaint, IChiefComplaint>,
    res: Response<IChiefComplaint>,
    next: NextFunction
  ) => {
    try {
      const result = await chiefComplaintService.update(
        req.params.id,
        req.body
      );
      logger.http(
        `Chief complaint updated successfully (ID: ${req.params.id})`
      );
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  };

  deleteChiefComplaint = async (
    req: Request<RequestParams>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await chiefComplaintService.delete(req.params.id);
      logger.http(
        `Chief complaint deleted successfully (ID was ${req.params.id})`
      );
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };
}
