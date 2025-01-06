import { Request, Response, NextFunction } from "express";
import { patientService } from "../services/patients.service.ts";
import IPatient from "../interfaces/IPatient.interface.ts";
import RequestParams from "../interfaces/RequestParams.interface.ts";
import { logger } from "../utils/logger.ts";

export default class PatientController {
  handleId = async (
    req: Request,
    res: Response,
    next: NextFunction,
    id: string
  ) => {
    try {
      logger.debug("Checking for existing ID");
      await patientService.getById(id);
      next();
    } catch (err) {
      next(err);
    }
  };

  getAllPatients = async (
    req: Request,
    res: Response<IPatient[]>,
    next: NextFunction
  ) => {
    try {
      const result = await patientService.getAll();
      logger.http(`Patients found succesfully`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  getPatientById = async (
    req: Request<RequestParams>,
    res: Response<IPatient>,
    next: NextFunction
  ) => {
    try {
      logger.debug("Patient was found in validations!");
      const result = await patientService.getById(req.params.id);
      logger.http(`Patient found succesfully (ID: ${req.params.id})`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  createPatient = async (
    req: Request<{}, IPatient, IPatient>,
    res: Response<IPatient>,
    next: NextFunction
  ) => {
    try {
      const result = await patientService.create(req.body);
      logger.http(`Patient created succesfully`);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  };

  updatePatient = async (
    req: Request<RequestParams, IPatient, IPatient>,
    res: Response<IPatient>,
    next: NextFunction
  ) => {
    try {
      const result = await patientService.update(req.params.id, req.body);
      logger.http(`Patient updated successfully (ID: ${req.params.id})`);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  };

  deletePatient = async (
    req: Request<RequestParams>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await patientService.delete(req.params.id);
      logger.http(`Patient deleted successfully (ID was ${req.params.id})`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };
}
