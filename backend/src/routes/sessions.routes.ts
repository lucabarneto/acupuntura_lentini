import { Router } from "express";
import { ISession } from "../types/mongo/ISession.ts";
import { SessionController } from "../controllers/sessions.controller.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { RequestParams } from "../types/express/RequestParams.ts";
import multer from "multer";
import { uploadImage } from "../middlewares/uploadImage.ts";

export const sessionRouter = Router();
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
  multer().single("patient_tongue"),
  uploadImage("patient_tongue"),
  validateRequest({ body: ISession }),
  sessionController.createSession
);

sessionRouter.put(
  "/:id",
  multer().single("patient_tongue"),
  uploadImage("patient_tongue"),
  validateRequest({ params: RequestParams, body: ISession }),
  sessionController.updateSession
);

sessionRouter.delete(
  "/:id",
  validateRequest({ params: RequestParams }),
  sessionController.deleteSession
);
