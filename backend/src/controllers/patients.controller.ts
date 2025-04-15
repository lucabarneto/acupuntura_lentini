import { Request, Response, NextFunction } from "express";
import { IPatient } from "../types/mongo/IPatient.js";
import { patientService } from "../services/patients.service.js";
import { RequestParams } from "../types/express/RequestParams.js";
import { RequestQueries } from "../types/express/RequestQueries.js";
import { logger } from "../utils/logger.js";
import { SortQueries } from "../types/general/SortQueries.js";
import { SuccessResponse } from "../types/express/Response.js";

export class PatientController {
  handleId = async (
    req: Request,
    res: Response,
    next: NextFunction,
    id: string
  ) => {
    try {
      logger.debug("Checking for existing ID");
      req.patient = await patientService.getById(id);
      next();
    } catch (err) {
      next(err);
    }
  };

  getAllPatients = async (
    req: Request<RequestQueries>,
    res: Response<SuccessResponse<IPatient[]>>,
    next: NextFunction
  ) => {
    try {
      const sort = req.query.first_name
        ? ({ first_name: req.query.first_name } as SortQueries)
        : req.query.next_appointment
        ? ({ next_appointment: req.query.next_appointment } as SortQueries)
        : undefined;

      const result = await patientService.getAll(sort);
      logger.http(`Patients found succesfully`);
      res
        .status(200)
        .send({ status: "success", statusCode: 200, payload: result });
    } catch (err) {
      next(err);
    }
  };

  getPatientById = async (
    req: Request<RequestParams>,
    res: Response<SuccessResponse<IPatient>>,
    next: NextFunction
  ) => {
    try {
      logger.http(`Patient found succesfully (ID: ${req.params.id})`);
      res
        .status(200)
        .send({ status: "success", statusCode: 200, payload: req.patient! });
    } catch (err) {
      next(err);
    }
  };

  createPatient = async (
    req: Request<{}, SuccessResponse<IPatient>, IPatient>,
    res: Response<SuccessResponse<IPatient>>,
    next: NextFunction
  ) => {
    try {
      const result = await patientService.create(req.body);
      logger.http(`Patient created succesfully`);
      res
        .status(201)
        .send({ status: "success", statusCode: 201, payload: result });
    } catch (err) {
      next(err);
    }
  };

  updatePatient = async (
    req: Request<RequestParams, SuccessResponse<IPatient>, IPatient>,
    res: Response<SuccessResponse<IPatient>>,
    next: NextFunction
  ) => {
    try {
      const result = await patientService.update(req.params.id, req.body);
      logger.http(`Patient updated successfully (ID: ${req.params.id})`);
      res
        .status(201)
        .send({ status: "success", statusCode: 201, payload: result });
    } catch (err) {
      next(err);
    }
  };

  deletePatient = async (
    req: Request<RequestParams>,
    res: Response<SuccessResponse<{}>>,
    next: NextFunction
  ) => {
    try {
      const result = await patientService.delete(req.params.id);
      logger.http(`Patient deleted successfully (ID was ${req.params.id})`);
      res
        .status(200)
        .send({ status: "success", statusCode: 200, payload: result });
    } catch (err) {
      next(err);
    }
  };
}
