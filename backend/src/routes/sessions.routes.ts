import { Router } from "express";
import SessionController from "../controllers/sessions.controller.ts";
import ChiefComplaintController from "../controllers/chiefComplaints.controller.ts";
import ISession from "../interfaces/ISession.interface.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import RequestParams from "../interfaces/RequestParams.interface.ts";

const sessionRouter = Router();
const sessionController = new SessionController();
const chiefComplaintController = new ChiefComplaintController();

sessionRouter.get("/", sessionController.getAllSessions);

sessionRouter.get(
  "/:id",
  validateRequest({ params: RequestParams }),
  sessionController.getSessionById
);

sessionRouter.post(
  "/",
  validateRequest({ body: ISession }),
  sessionController.createSession,
  chiefComplaintController.addSessionToChiefComplaint
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
