import { Router } from "express";
import SessionController from "../controllers/sessions.controller.ts";
import ISession from "../types/mongo/ISession.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import RequestParams from "../types/express/RequestParams.ts";

const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.param("id", sessionController.handleId);

sessionRouter.get("/", sessionController.getAllSessions);

sessionRouter.get(
  "/:id",
  validateRequest({ params: RequestParams }),
  sessionController.getSessionById
);

sessionRouter.post(
  "/",
  validateRequest({ body: ISession }),
  sessionController.createSessionAndAddToChiefComplaintAndAppointments
);

sessionRouter.put(
  "/:id",
  validateRequest({ params: RequestParams, body: ISession }),
  sessionController.updateSession
);

sessionRouter.delete(
  "/:id",
  validateRequest({ params: RequestParams }),
  sessionController.deleteSession
);

export default sessionRouter;
