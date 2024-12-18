import { Request, Response } from "express";
import Patient from "../services/patient.service.ts";

const patient = new Patient();

export default class PatientRoutesController {
  async getAllPatients(req: Request, res: Response) {
    try {
      const result = await patient.getAllPatients();
      res.status(200).send(result);
    } catch (error) {
      res.send(error ? error : "An error occurred");
    }
  }

  async getPatientById(req: Request, res: Response) {
    try {
      const result = await patient.getPatientById(req.params.id);
      res.status(200).send(result);
    } catch (error) {
      res.send(error ? error : "An error occurred");
    }
  }

  async createPatient(req: Request, res: Response) {
    try {
      const result = await patient.createPatient(req.body);
      res.status(201).send(result);
    } catch (error) {
      res.send(error ? error : "An error occurred");
    }
  }

  async updatePatient(req: Request, res: Response) {
    try {
      const result = await patient.updatePatient(req.params.id, req.body);
      res.status(201).send(result);
    } catch (error) {
      res.send(error ? error : "An error occurred");
    }
  }

  async deletePatient(req: Request, res: Response) {
    try {
      const result = await patient.deletePatient(req.params.id);

      res.send(result);
    } catch (error) {
      res.send("An error occurred");
    }
  }
}
