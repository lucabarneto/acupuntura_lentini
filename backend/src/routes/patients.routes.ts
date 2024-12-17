import { Router } from "express";
import Patient from "../services/patient_service.ts";

const patientRouter = Router();
const patientService = new Patient();

patientRouter.get("/", async (req, res) => {
  try {
    const patients = await patientService.getAllPatients();
    res.send(patients);
  } catch (error) {
    res.send("An error occurred");
  }
});

patientRouter.get("/:id", async (req, res) => {
  try {
    const patient = await patientService.getPatientById(req.params.id);
    res.send(patient);
  } catch (error) {
    res.send("An error occurred");
  }
});

patientRouter.post("/", async (req, res) => {
  try {
    const newPatient = await patientService.createPatient(req.body);
    res.send(newPatient);
  } catch (error) {
    res.send("An error occurred");
  }
});

patientRouter.put("/:id", async (req, res) => {
  try {
    const patient = await patientService.updatePatient(req.params.id, req.body);
    res.send(patient);
  } catch (error) {
    res.send("An error occurred");
  }
});

patientRouter.delete("/:id", async (req, res) => {
  try {
    const deletedPatient = await patientService.deletePatient(req.params.id);

    res.send(deletedPatient);
  } catch (error) {
    res.send("An error occurred");
  }
});

export default patientRouter;
