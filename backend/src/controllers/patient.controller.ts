import { Request, Response, NextFunction } from "express";
import Patient from "../services/patient.service.ts";
import IPatient from "../interfaces/IPatient.interface.ts";
import ParamsWithId from "../interfaces/RequestParams.interface.ts";
import { logger } from "../utils/logger.ts";

const patient = new Patient();

export default class PatientController {
  async getAllPatients(
    req: Request,
    res: Response<IPatient[]>,
    next: NextFunction
  ) {
    try {
      const result = await patient.getAllPatients();
      logger.http(`Patients found succesfully`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }

  async getPatientById(
    req: Request<ParamsWithId>,
    res: Response<IPatient>,
    next: NextFunction
  ) {
    try {
      const result = await patient.getPatientById(req.params.id);
      logger.http(`Patient found succesfully (ID: ${req.params.id})`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }

  async createPatient(
    req: Request<{}, IPatient, IPatient>,
    res: Response<IPatient>,
    next: NextFunction
  ) {
    try {
      const result = await patient.createPatient(req.body);
      logger.http(`Patient created succesfully`);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  }

  async updatePatient(
    req: Request<ParamsWithId, IPatient, IPatient>,
    res: Response<IPatient>,
    next: NextFunction
  ) {
    try {
      const result = await patient.updatePatient(req.params.id, req.body);
      logger.http(`Patient updated successfully (ID: ${req.params.id})`);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  }

  async deletePatient(
    req: Request<ParamsWithId>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await patient.deletePatient(req.params.id);
      logger.http(`Patient deleted successfully (ID was ${req.params.id})`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
}
