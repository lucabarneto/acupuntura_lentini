import { Router } from "express";
import ChiefComplaintController from "../controllers/chiefComplaints.controller.ts";
import PatientController from "../controllers/patients.controller.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import IChiefComplaint from "../interfaces/IChiefComplaint.interface.ts";
import RequestParams from "../interfaces/RequestParams.interface.ts";

const chiefComplaintRouter = Router();
const chiefComplaintController = new ChiefComplaintController();
const patientController = new PatientController();

chiefComplaintRouter.param("id", chiefComplaintController.handleId);

chiefComplaintRouter.get("/", chiefComplaintController.getAllChiefComplaints);

chiefComplaintRouter.get(
  "/:id",
  validateRequest({ params: RequestParams }),
  chiefComplaintController.getChiefComplaintById
);

chiefComplaintRouter.post(
  "/",
  validateRequest({ body: IChiefComplaint }),
  chiefComplaintController.createChiefComplaint,
  patientController.addChiefComplaintToPatient
);

chiefComplaintRouter.put(
  "/:id",
  validateRequest({ params: RequestParams, body: IChiefComplaint }),
  chiefComplaintController.updateChiefComplaint
);

chiefComplaintRouter.delete(
  "/:id",
  validateRequest({ params: RequestParams }),
  chiefComplaintController.deleteChiefComplaint
);

export default chiefComplaintRouter;
