import { Request, Response, NextFunction } from "express";
import { appointmentService } from "../services/appointments.service.ts";
import IAppointment from "../types/mongo/IAppointment.ts";
import RequestParams from "../types/express/RequestParams.ts";
import { logger } from "../utils/logger.ts";
import { patientService } from "../services/patients.service.ts";

export default class AppointmentController {
  handleId = async (
    req: Request,
    res: Response,
    next: NextFunction,
    id: string
  ) => {
    try {
      logger.debug("Checking for existing ID");
      await appointmentService.getById(id);
      next();
    } catch (err) {
      next(err);
    }
  };

  getAllAppointments = async (
    req: Request,
    res: Response<IAppointment[]>,
    next: NextFunction
  ) => {
    try {
      const result = await appointmentService.getAll();
      logger.http(`Appointments found succesfully`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  getAppointmentById = async (
    req: Request<RequestParams>,
    res: Response<IAppointment>,
    next: NextFunction
  ) => {
    try {
      const result = await appointmentService.getById(req.params.id);
      logger.http(`Appointment found succesfully (ID: ${req.params.id})`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  createAppointmentAndAddToPatient = async (
    req: Request<{}, IAppointment, IAppointment>,
    res: Response<IAppointment>,
    next: NextFunction
  ) => {
    try {
      const patient = await patientService.getById(req.body.patient.toString());

      const result = await appointmentService.create(req.body);

      await patientService.addAppointmentToPatient(
        { patient_id: patient._id!, appointment_id: result._id! },
        patient
      );
      logger.http(`Appointment created succesfully`);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  };

  updateAppointment = async (
    req: Request<RequestParams, IAppointment, IAppointment>,
    res: Response<IAppointment>,
    next: NextFunction
  ) => {
    try {
      const result = await appointmentService.update(req.params.id, req.body);
      logger.http(`Appointment updated successfully (ID: ${req.params.id})`);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  };

  deleteAppointment = async (
    req: Request<RequestParams>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await appointmentService.delete(req.params.id);
      logger.http(`Appointment deleted successfully (ID was ${req.params.id})`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };
}
