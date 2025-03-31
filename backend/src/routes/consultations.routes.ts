import { Router } from "express";
import { IConsultation } from "../types/mongo/IConsultation.ts";
import { ConsultationController } from "../controllers/consultations.controller.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { RequestParams } from "../types/express/RequestParams.ts";
import multer from "multer";
import { uploadImage } from "../middlewares/uploadImage.ts";
import { authenticate } from "../middlewares/authenticate.ts";

const consultationController = new ConsultationController();

export const consultationRouter = Router();

consultationRouter.param("id", consultationController.handleId);

consultationRouter.get(
  "/",
  // authenticate("jwt", { session: false }),
  consultationController.getAllConsultations
);

consultationRouter.get(
  "/:id",
  // authenticate("jwt", { session: false }),
  validateRequest({ params: RequestParams }),
  consultationController.getConsultationById
);

consultationRouter.post(
  "/",
  // authenticate("jwt", { session: false }),
  multer().single("patient_tongue_image"),
  uploadImage("patient_tongue_image"),
  validateRequest({ body: IConsultation }),
  consultationController.createConsultation
);

consultationRouter.put(
  "/:id",
  // authenticate("jwt", { session: false }),
  multer().single("patient_tongue_image"),
  uploadImage("patient_tongue_image"),
  validateRequest({ params: RequestParams, body: IConsultation }),
  consultationController.updateConsultation
);

consultationRouter.delete(
  "/:id",
  // authenticate("jwt", { session: false }),
  validateRequest({ params: RequestParams }),
  consultationController.deleteConsultation
);
