import { Router } from "express";
import PatientController from "../controllers/patient.controller.ts";
import IPatient from "../interfaces/IPatient.interface.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import ParamsWithId from "../interfaces/paramsWithId.interface.ts";

const patientRouter = Router();
const patientController = new PatientController();

patientRouter.get("/", patientController.getAllPatients);

patientRouter.get(
  "/:id",
  validateRequest({ params: ParamsWithId }),
  patientController.getPatientById
);

patientRouter.post(
  "/",
  validateRequest({ body: IPatient }),
  patientController.createPatient
);

patientRouter.put(
  "/:id",
  validateRequest({ params: ParamsWithId, body: IPatient }),
  patientController.updatePatient
);

patientRouter.delete(
  "/:id",
  validateRequest({ params: ParamsWithId }),
  patientController.deletePatient
);

export default patientRouter;
