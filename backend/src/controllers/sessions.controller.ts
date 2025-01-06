import { Request, Response, NextFunction } from "express";
import { sessionService } from "../services/sessions.service.ts";
import ISession from "../interfaces/ISession.interface.ts";
import RequestParams from "../interfaces/RequestParams.interface.ts";
import { logger } from "../utils/logger.ts";

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

  createSession = async (
    req: Request<{}, {}, ISession>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await sessionService.create(req.body);
      logger.http(`Session created succesfully`);

      req.url = `/api/chiefcomplaints/:id/sessions/:second_id`;
      req.params = {
        id: result.chief_complaint,
        second_id: result._id!,
      };
      next();
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
