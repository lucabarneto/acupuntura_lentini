import { Router } from "express";
import multer from "multer";
import { IPatient } from "../types/mongo/IPatient.js";
import { PatientController } from "../controllers/patients.controller.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { RequestParams } from "../types/express/RequestParams.js";
import { RequestQueries } from "../types/express/RequestQueries.js";
import { uploadImage } from "../middlewares/uploadImage.js";
import { authenticate } from "../middlewares/authenticate.js";

const patientController = new PatientController();

export const patientRouter = Router();

patientRouter.param("id", patientController.handleId);

patientRouter.get(
  "/",
  authenticate("jwt", { session: false }),
  validateRequest({ query: RequestQueries }),
  patientController.getAllPatients
);

patientRouter.get(
  "/:id",
  authenticate("jwt", { session: false }),
  validateRequest({ params: RequestParams }),
  patientController.getPatientById
);

patientRouter.post(
  "/",
  authenticate("jwt", { session: false }),
  multer().single("profile_picture"),
  uploadImage("profile_picture"),
  validateRequest({ body: IPatient }),
  patientController.createPatient
);

patientRouter.put(
  "/:id",
  authenticate("jwt", { session: false }),
  multer().single("profile_picture"),
  uploadImage("profile_picture"),
  validateRequest({ params: RequestParams, body: IPatient }),
  patientController.updatePatient
);

patientRouter.delete(
  "/:id",
  authenticate("jwt", { session: false }),
  validateRequest({ params: RequestParams }),
  patientController.deletePatient
);
