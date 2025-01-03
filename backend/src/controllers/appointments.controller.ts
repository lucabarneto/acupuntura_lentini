import { Request, Response, NextFunction } from "express";
import Appointment from "../services/appointments.service.ts";
import IAppointment from "../interfaces/IAppointment.interface.ts";
import RequestParams from "../interfaces/RequestParams.interface.ts";
import { logger } from "../utils/logger.ts";

const appointment = new Appointment();

export default class AppointmentController {
  getAllAppointments = async (
    req: Request,
    res: Response<IAppointment[]>,
    next: NextFunction
  ) => {
    try {
      const result = await appointment.getAll();
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
      const result = await appointment.getById(req.params.id);
      logger.http(`Appointment found succesfully (ID: ${req.params.id})`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  createAppointment = async (
    req: Request<{}, IAppointment, IAppointment>,
    res: Response<IAppointment>,
    next: NextFunction
  ) => {
    try {
      const result = await appointment.create(req.body);
      logger.http(`Appointment created succesfully`);

      req.url = `/api/patient/:id/appointments/:second_id`;
      req.params = {
        id: result.patient,
        second_id: result._id,
      };
      next();
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
      const result = await appointment.update(req.params.id, req.body);
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
      const result = await appointment.delete(req.params.id);
      logger.http(`Appointment deleted successfully (ID was ${req.params.id})`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };
}
