import { Request, Response, NextFunction } from "express";
import { chiefComplaintService } from "../services/chiefComplaints.service.ts";
import IChiefComplaint from "../interfaces/IChiefComplaint.interface.ts";
import RequestParams from "../interfaces/RequestParams.interface.ts";
import { logger } from "../utils/logger.ts";

export default class ChiefComplaintController {
  handleId = async (
    req: Request,
    res: Response,
    next: NextFunction,
    id: string
  ) => {
    try {
      logger.debug("Checking for existing ID");
      await chiefComplaintService.getById(id);
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
    req: Request<{}, {}, IChiefComplaint>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await chiefComplaintService.create(req.body);

      logger.http(`Chief Complaint created succesfully`);

      req.url = `/api/patients/:id/chiefcomplaints/:second_id`;
      req.params = {
        id: result.patient,
        second_id: result._id!,
      };
      next();
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

  addSessionToChiefComplaint = async (
    req: Request<RequestParams>,
    res: Response<IChiefComplaint>,
    next: NextFunction
  ) => {
    try {
      const result = await chiefComplaintService.getByIdAndAddSession(
        req.params.id,
        req.params.second_id!
      );

      logger.http(`Session added to chief complaint successfully`);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  };
}
