import { Router } from "express";
import PatientController from "../controllers/patients.controller.ts";
import IPatient from "../interfaces/IPatient.interface.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import RequestParams from "../interfaces/RequestParams.interface.ts";
import { multerUpload } from "../utils/multer.ts";
import { cloudinaryUpload } from "../middlewares/cloudinaryUpload.ts";

const patientRouter = Router();
const patientController = new PatientController();

patientRouter.get("/", patientController.getAllPatients);

patientRouter.get(
  "/:id",
  validateRequest({ params: RequestParams }),
  patientController.getPatientById
);

patientRouter.post(
  "/",
  multerUpload.single("profile_picture"),
  cloudinaryUpload,
  validateRequest({ body: IPatient }),
  patientController.createPatient
);

patientRouter.put(
  "/:id",
  validateRequest({ params: RequestParams, body: IPatient }),
  patientController.updatePatient
);

patientRouter.delete(
  "/:id",
  validateRequest({ params: RequestParams }),
  patientController.deletePatient
);

export default patientRouter;
