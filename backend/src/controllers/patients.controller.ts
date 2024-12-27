import { Request, Response, NextFunction } from "express";
import Patient from "../services/patients.service.ts";
import ChiefComplaint from "../services/chiefComplaints.service.ts";
import IPatient from "../interfaces/IPatient.interface.ts";
import IChiefComplaint from "../interfaces/IChiefComplaint.interface.ts";
import RequestParams from "../interfaces/RequestParams.interface.ts";
import { logger } from "../utils/logger.ts";

const patient = new Patient();
const chiefComplaint = new ChiefComplaint();

export default class PatientController {
  getAllPatients = async (
    req: Request,
    res: Response<IPatient[]>,
    next: NextFunction
  ) => {
    try {
      const result = await patient.getAll();
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
      const result = await patient.getById(req.params.id);
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
      const result = await patient.create(req.body);
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
      const result = await patient.update(req.params.id, req.body);
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
      const result = await patient.delete(req.params.id);
      logger.http(`Patient deleted successfully (ID was ${req.params.id})`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  addChiefComplaintToPatient = async (
    req: Request<RequestParams, IPatient, IChiefComplaint>,
    res: Response<IPatient>,
    next: NextFunction
  ) => {
    try {
      const newChiefComplaint = await this.createChiefComplaint(req.body);
      const result = await this.updatePatientWithChiefComplaint(
        req.params.id,
        newChiefComplaint
      );

      logger.http(
        `Chief complaint (ID: ${newChiefComplaint._id}) added to patient successfully`
      );
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  private createChiefComplaint = async (data: IChiefComplaint) => {
    try {
      const result = await chiefComplaint.create(data);
      return result;
    } catch (err) {
      throw err;
    }
  };

  private updatePatientWithChiefComplaint = async (
    id: string,
    data: IChiefComplaint
  ) => {
    try {
      const update = await patient.getById(id);

      update.chief_complaints!.push({
        chief_complaint: data._id!,
      });

      const result = await patient.update(id, update);
      return result;
    } catch (err) {
      throw err;
    }
  };
}
