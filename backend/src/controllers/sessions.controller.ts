import { Request, Response, NextFunction } from "express";
import { sessionService } from "../services/sessions.service.ts";
import ISession from "../types/ISession.interface.ts";
import RequestParams from "../types/express/RequestParams.interface.ts";
import { logger } from "../utils/logger.ts";
import { chiefComplaintService } from "../services/chiefComplaints.service.ts";
import { appointmentService } from "../services/appointments.service.ts";
import { patientService } from "../services/patients.service.ts";

export default class SessionController {
  handleId = async (
    req: Request,
    res: Response,
    next: NextFunction,
    id: string
  ) => {
    try {
      logger.debug("Checking for existing ID");
      await sessionService.getById(id);
      next();
    } catch (err) {
      next(err);
    }
  };

  getAllSessions = async (
    req: Request,
    res: Response<ISession[]>,
    next: NextFunction
  ) => {
    try {
      const result = await sessionService.getAll();
      logger.http(`Sessions found succesfully`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  getSessionById = async (
    req: Request<RequestParams>,
    res: Response<ISession>,
    next: NextFunction
  ) => {
    try {
      const result = await sessionService.getById(req.params.id);
      logger.http(`Session found succesfully (ID: ${req.params.id})`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  createSessionAndAddToChiefComplaintAndAppointments = async (
    req: Request<{}, {}, ISession>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await patientService.getById(req.body.patient.toString());
      const chiefComplaint = await chiefComplaintService.getById(
        req.body.chief_complaint.toString()
      );
      const appointment = await appointmentService.getById(
        req.body.appointment.toString()
      );

      const result = await sessionService.create(req.body);

      await chiefComplaintService.addSessionToChiefComplaint(
        { chief_complaint_id: chiefComplaint._id!, session_id: result._id! },
        chiefComplaint
      );

      await appointmentService.addSessionToAppointment(
        { appointment_id: appointment._id!, session_id: result._id! },
        appointment
      );

      logger.http(`Session created succesfully`);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  };

  updateSession = async (
    req: Request<RequestParams, ISession, ISession>,
    res: Response<ISession>,
    next: NextFunction
  ) => {
    try {
      const result = await sessionService.update(req.params.id, req.body);
      logger.http(`Session updated successfully (ID: ${req.params.id})`);
      res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  };

  deleteSession = async (
    req: Request<RequestParams>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await sessionService.delete(req.params.id);
      logger.http(`Session deleted successfully (ID was ${req.params.id})`);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };
}
