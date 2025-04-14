import { Router } from "express";
import { IPatient } from "../types/mongo/IPatient";
import { PatientController } from "../controllers/patients.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { RequestParams } from "../types/express/RequestParams";
import { RequestQueries } from "../types/express/RequestQueries";
import multer from "multer";
import { uploadImage } from "../middlewares/uploadImage";
// import { authenticate } from "../middlewares/authenticate";

const patientController = new PatientController();

export const patientRouter = Router();

patientRouter.param("id", patientController.handleId);

patientRouter.get(
  "/",
  // authenticate("jwt", { session: false }),
  validateRequest({ query: RequestQueries }),
  patientController.getAllPatients
);

patientRouter.get(
  "/:id",
  // authenticate("jwt", { session: false }),
  validateRequest({ params: RequestParams }),
  patientController.getPatientById
);

patientRouter.post(
  "/",
  // authenticate("jwt", { session: false }),
  multer().single("profile_picture"),
  uploadImage("profile_picture"),
  validateRequest({ body: IPatient }),
  patientController.createPatient
);

patientRouter.put(
  "/:id",
  // authenticate("jwt", { session: false }),
  multer().single("profile_picture"),
  uploadImage("profile_picture"),
  validateRequest({ params: RequestParams, body: IPatient }),
  patientController.updatePatient
);

patientRouter.delete(
  "/:id",
  // authenticate("jwt", { session: false }),
  validateRequest({ params: RequestParams }),
  patientController.deletePatient
);
