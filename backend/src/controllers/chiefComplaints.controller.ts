import { Request, Response, NextFunction } from "express";
import ChiefComplaint from "../services/chiefComplaints.service.ts";
import IChiefComplaint from "../interfaces/IChiefComplaint.interface.ts";
import RequestParams from "../interfaces/RequestParams.interface.ts";
import { logger } from "../utils/logger.ts";

const chiefComplaint = new ChiefComplaint();

export default class ChiefComplaintController {
  async getAllChiefComplaints(
    req: Request,
    res: Response<IChiefComplaint[]>,
    next: NextFunction
  ) {
    try {
      const result = await chiefComplaint.getAll();

      logger.http(`Chief Complaints found succesfully`);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getChiefComplaintById(
    req: Request<RequestParams>,
    res: Response<IChiefComplaint>,
    next: NextFunction
  ) {
    try {
      const result = await chiefComplaint.getById(req.params.id);

      logger.http(`Chief Complaint found succesfully (ID: ${req.params.id})`);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async createChiefComplaint(
    req: Request<{}, IChiefComplaint, IChiefComplaint>,
    res: Response<IChiefComplaint>,
    next: NextFunction
  ) {
    try {
      const result = await chiefComplaint.create(req.body);

      logger.http(`Chief Complaint created succesfully`);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateChiefComplaint(
    req: Request<RequestParams, IChiefComplaint, IChiefComplaint>,
    res: Response<IChiefComplaint>,
    next: NextFunction
  ) {
    try {
      const result = await chiefComplaint.update(req.params.id, req.body);
      logger.http(
        `Chief complaint updated successfully (ID: ${req.params.id})`
      );
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  }

  async deleteChiefComplaint(
    req: Request<RequestParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await chiefComplaint.delete(req.params.id);
      logger.http(
        `Chief copmlaint deleted successfully (ID was ${req.params.id})`
      );
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
}
