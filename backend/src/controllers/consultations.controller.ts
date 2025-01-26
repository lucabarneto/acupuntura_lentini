import { Request, Response, NextFunction } from "express";
import { IConsultation } from "../types/mongo/IConsultation.ts";
import { consultationService } from "../services/consultations.service.ts";
import { RequestParams } from "../types/express/RequestParams.ts";
import { logger } from "../utils/logger.ts";

export class ConsultationController {
  handleId = async (
    req: Request,
    res: Response,
    next: NextFunction,
    id: string
  ) => {
    try {
      logger.debug("Checking for existing ID");
      await consultationService.getById(id);
      next();
    } catch (err) {
      next(err);
    }
  };

  getAllConsultations = async (
    req: Request,
    res: Response<IConsultation[]>,
    next: NextFunction
  ) => {
    try {
      const result = await consultationService.getAll();
      logger.http(`Consultations found succesfully`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  getConsultationById = async (
    req: Request<RequestParams>,
    res: Response<IConsultation>,
    next: NextFunction
  ) => {
    try {
      const result = await consultationService.getById(req.params.id);
      logger.http(`Consultation found succesfully (ID: ${req.params.id})`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  createConsultation = async (
    req: Request<{}, IConsultation, IConsultation>,
    res: Response<IConsultation>,
    next: NextFunction
  ) => {
    try {
      const result = await consultationService.create(req.body);
      logger.http(`Consultation created succesfully`);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  };

  updateConsultation = async (
    req: Request<RequestParams, IConsultation, IConsultation>,
    res: Response<IConsultation>,
    next: NextFunction
  ) => {
    try {
      const result = await consultationService.update(req.params.id, req.body);
      logger.http(`Consultation updated successfully (ID: ${req.params.id})`);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  };

  deleteConsultation = async (
    req: Request<RequestParams>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await consultationService.delete(req.params.id);
      logger.http(
        `Consultation deleted successfully (ID was ${req.params.id})`
      );
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };
}
