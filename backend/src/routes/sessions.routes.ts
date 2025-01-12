import { Router } from "express";
import { ISession } from "../types/mongo/ISession.ts";
import { SessionController } from "../controllers/sessions.controller.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { RequestParams } from "../types/express/RequestParams.ts";
import { multerUpload } from "../utils/multer.ts";
import { cloudinaryUpload } from "../middlewares/cloudinaryUpload.ts";

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
  multerUpload.single("patient_tongue"),
  cloudinaryUpload("patient_tongue"),
  validateRequest({ body: ISession }),
  sessionController.createSession
);

sessionRouter.put(
  "/:id",
  multerUpload.single("patient_tongue"),
  cloudinaryUpload("patient_tongue"),
  validateRequest({ params: RequestParams, body: ISession }),
  sessionController.updateSession
);

sessionRouter.delete(
  "/:id",
  validateRequest({ params: RequestParams }),
  sessionController.deleteSession
);
