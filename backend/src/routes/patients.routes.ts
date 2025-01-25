import { Router } from "express";
import { IPatient } from "../types/mongo/IPatient.ts";
import { PatientController } from "../controllers/patients.controller.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { RequestParams } from "../types/express/RequestParams.ts";
import { RequestQueries } from "../types/express/RequestQueries.ts";
import { multerUpload } from "../utils/multer.ts";
import { cloudinaryUpload } from "../middlewares/cloudinaryUpload.ts";

export const patientRouter = Router();
const patientController = new PatientController();

patientRouter.param("id", patientController.handleId);

patientRouter.get(
  "/",
  validateRequest({ query: RequestQueries }),
  patientController.getAllPatients
);

patientRouter.get(
  "/:id",
  validateRequest({ params: RequestParams }),
  patientController.getPatientById
);

patientRouter.post(
  "/",
  multerUpload.single("profile_picture"),
  cloudinaryUpload("profile_picture"),
  validateRequest({ body: IPatient }),
  patientController.createPatient
);

patientRouter.put(
  "/:id",
  multerUpload.single("profile_picture"),
  cloudinaryUpload("profile_picture"),
  validateRequest({ params: RequestParams, body: IPatient }),
  patientController.updatePatient
);

patientRouter.delete(
  "/:id",
  validateRequest({ params: RequestParams }),
  patientController.deletePatient
);
