import { Router } from "express";
import PatientController from "../controllers/patient.controller.ts";

const patientRouter = Router();
const patientController = new PatientController();

patientRouter.get("/", patientController.getAllPatients);

patientRouter.get("/:id", patientController.getPatientById);

patientRouter.post("/", patientController.createPatient);

patientRouter.put("/:id", patientController.updatePatient);

patientRouter.delete("/:id", patientController.deletePatient);

export default patientRouter;
