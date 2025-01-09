import { Router } from "express";
import { IPatient } from "../types/mongo/IPatient.ts";
import { PatientController } from "../controllers/patients.controller.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { RequestParams } from "../types/express/RequestParams.ts";
import { multerUpload } from "../utils/multer.ts";
import { cloudinaryUpload } from "../middlewares/cloudinaryUpload.ts";
import { IChiefComplaint } from "../types/mongo/IChiefComplaint.ts";
import { IAppointment } from "../types/mongo/IAppointment.ts";

const patientRouter = Router();
const patientController = new PatientController();

patientRouter.param("id", patientController.handleId);

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
  multerUpload.single("profile_picture"),
  cloudinaryUpload,
  validateRequest({ params: RequestParams, body: IPatient }),
  patientController.updatePatient
);

patientRouter.delete(
  "/:id",
  validateRequest({ params: RequestParams }),
  patientController.deletePatient
);

patientRouter.put(
  "/:id/chiefcomplaints",
  validateRequest({ params: RequestParams, body: IChiefComplaint }),
  patientController.addNewChiefComplaintToPatient
);

patientRouter.put(
  "/:id/appointments",
  validateRequest({ params: RequestParams, body: IAppointment }),
  patientController.addNewAppointmentToPatient
);

export default patientRouter;
