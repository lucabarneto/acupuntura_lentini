import { Router } from "express";
import { IConsultation } from "../types/mongo/IConsultation.ts";
import { ConsultationController } from "../controllers/consultations.controller.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { RequestParams } from "../types/express/RequestParams.ts";
import multer from "multer";
import { uploadImage } from "../middlewares/uploadImage.ts";

export const consultationRouter = Router();
const consultationController = new ConsultationController();

consultationRouter.param("id", consultationController.handleId);

consultationRouter.get("/", consultationController.getAllConsultations);

consultationRouter.get(
  "/:id",
  validateRequest({ params: RequestParams }),
  consultationController.getConsultationById
);

consultationRouter.post(
  "/",
  multer().single("patient_tongue"),
  uploadImage("patient_tongue"),
  validateRequest({ body: IConsultation }),
  consultationController.createConsultation
);

consultationRouter.put(
  "/:id",
  multer().single("patient_tongue"),
  uploadImage("patient_tongue"),
  validateRequest({ params: RequestParams, body: IConsultation }),
  consultationController.updateConsultation
);

consultationRouter.delete(
  "/:id",
  validateRequest({ params: RequestParams }),
  consultationController.deleteConsultation
);
