import { Request, Response, NextFunction } from "express";
import { IAppointment } from "../types/mongo/IAppointment";
import { appointmentService } from "../services/appointments.service";
import { RequestParams } from "../types/express/RequestParams";
import { logger } from "../utils/logger";
import { SuccessResponse } from "../types/express/Response";

export class AppointmentController {
  handleId = async (
    req: Request,
    res: Response,
    next: NextFunction,
    id: string
  ) => {
    try {
      logger.debug("Checking for existing ID");
      req.appointment = await appointmentService.getById(id);

      next();
    } catch (err) {
      next(err);
    }
  };

  getAllAppointments = async (
    req: Request,
    res: Response<SuccessResponse<IAppointment[]>>,
    next: NextFunction
  ) => {
    try {
      const result = await appointmentService.getAll();
      logger.http(`Appointments found succesfully`);
      res
        .status(200)
        .send({ status: "success", statusCode: 200, payload: result });
    } catch (err) {
      next(err);
    }
  };

  getAppointmentById = async (
    req: Request<RequestParams>,
    res: Response<SuccessResponse<IAppointment>>,
    next: NextFunction
  ) => {
    try {
      logger.http(`Appointment found succesfully (ID: ${req.params.id})`);
      res.status(200).send({
        status: "success",
        statusCode: 200,
        payload: req.appointment!,
      });
    } catch (err) {
      next(err);
    }
  };

  createAppointment = async (
    req: Request<RequestParams, IAppointment, IAppointment>,
    res: Response<SuccessResponse<IAppointment>>,
    next: NextFunction
  ) => {
    try {
      const result = await appointmentService.create(req.body);
      logger.http(`Appointment created succesfully`);
      res
        .status(201)
        .send({ status: "success", statusCode: 201, payload: result });
    } catch (err) {
      next(err);
    }
  };

  updateAppointment = async (
    req: Request<RequestParams, SuccessResponse<IAppointment>, IAppointment>,
    res: Response<SuccessResponse<IAppointment>>,
    next: NextFunction
  ) => {
    try {
      const result = await appointmentService.update(req.params.id, req.body);
      logger.http(`Appointment updated successfully (ID: ${req.params.id})`);
      res
        .status(201)
        .send({ status: "success", statusCode: 201, payload: result });
    } catch (err) {
      next(err);
    }
  };

  deleteAppointment = async (
    req: Request<RequestParams>,
    res: Response<SuccessResponse<{}>>,
    next: NextFunction
  ) => {
    try {
      const result = await appointmentService.delete(req.params.id);
      logger.http(`Appointment deleted successfully (ID was ${req.params.id})`);
      res
        .status(200)
        .send({ status: "success", statusCode: 200, payload: result });
    } catch (err) {
      next(err);
    }
  };
}
