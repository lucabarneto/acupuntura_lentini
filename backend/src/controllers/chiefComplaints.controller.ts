import { Request, Response, NextFunction } from "express";
import ChiefComplaint from "../services/chiefComplaints.service.ts";
import PatientController from "./patients.controller.ts";
import IChiefComplaint from "../interfaces/IChiefComplaint.interface.ts";
import RequestParams from "../interfaces/RequestParams.interface.ts";
import { logger } from "../utils/logger.ts";

const chiefComplaint = new ChiefComplaint();

export default class ChiefComplaintController {
  getAllChiefComplaints = async (
    req: Request,
    res: Response<IChiefComplaint[]>,
    next: NextFunction
  ) => {
    try {
      const result = await chiefComplaint.getAll();

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
      const result = await chiefComplaint.getById(req.params.id);

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
      const result = await chiefComplaint.create(req.body);

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
      const result = await chiefComplaint.update(req.params.id, req.body);
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
      const result = await chiefComplaint.delete(req.params.id);
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
      const result = await chiefComplaint.getByIdAndAddSession(
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
