import { Request, Response, NextFunction } from "express";
import Patient from "../services/patient.service.ts";
import IPatient from "../interfaces/patient.interface.ts";

const patient = new Patient();

export default class PatientController {
  async getAllPatients(req: Request, res: Response<IPatient[]>) {
    const result = await patient.getAllPatients();
    res.status(200).send(result);
  }

  async getPatientById(req: Request, res: Response<IPatient>) {
    const result = await patient.getPatientById(req.params.id);
    res.status(200).send(result);
  }

  async createPatient(
    req: Request<{}, IPatient, IPatient>,
    res: Response<IPatient>
  ) {
    IPatient.parse(req.body);
    const result = await patient.createPatient(req.body);
    res.status(201).send(result);
  }

  async updatePatient(
    req: Request<{ id: string }, IPatient, IPatient>,
    res: Response<IPatient>
  ) {
    IPatient.parse(req.body);
    const result = await patient.updatePatient(req.params.id, req.body);
    res.status(201).send(result);
  }

  async deletePatient(req: Request, res: Response) {
    const result = await patient.deletePatient(req.params.id);
    res.send(result);
  }
}
