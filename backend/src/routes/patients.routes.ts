import { Router } from "express";
import PatientController from "../controllers/patients.controller.ts";
import IPatient from "../interfaces/IPatient.interface.ts";
import IChiefComplaint from "../interfaces/IChiefComplaint.interface.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import RequestParams from "../interfaces/RequestParams.interface.ts";

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

patientRouter.put(
  "/:id/chiefcomplaints/:second_id",
  validateRequest({
    params: RequestParams,
  }),
  patientController.addChiefComplaintToPatient
);

export default patientRouter;
