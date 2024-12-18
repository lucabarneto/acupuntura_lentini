import { Router } from "express";
import PatientRoutesController from "../controllers/patient.controller.ts";

const patientRouter = Router();
const patientController = new PatientRoutesController();

patientRouter.get("/", (req, res) =>
  patientController.getAllPatients(req, res)
);

patientRouter.get("/:id", async (req, res) =>
  patientController.getPatientById(req, res)
);

patientRouter.post("/", async (req, res) =>
  patientController.createPatient(req, res)
);

patientRouter.put("/:id", async (req, res) =>
  patientController.updatePatient(req, res)
);

patientRouter.delete("/:id", async (req, res) =>
  patientController.deletePatient(req, res)
);

export default patientRouter;
