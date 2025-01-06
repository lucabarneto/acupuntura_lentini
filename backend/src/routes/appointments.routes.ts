import { Router } from "express";
import AppointmentController from "../controllers/appointments.controller.ts";
import IAppointment from "../interfaces/IAppointment.interface.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import RequestParams from "../interfaces/RequestParams.interface.ts";
import PatientController from "../controllers/patients.controller.ts";

const appointmentRouter = Router();
const appointmentController = new AppointmentController();
const patientController = new PatientController();

appointmentRouter.param("id", appointmentController.handleId);

appointmentRouter.get("/", appointmentController.getAllAppointments);

appointmentRouter.get(
  "/:id",
  validateRequest({ params: RequestParams }),
  appointmentController.getAppointmentById
);

appointmentRouter.post(
  "/",
  validateRequest({ body: IAppointment }),
  appointmentController.createAppointment,
  patientController.addAppointmentToPatient
);

appointmentRouter.put(
  "/:id",
  validateRequest({ params: RequestParams, body: IAppointment }),
  appointmentController.updateAppointment
);

appointmentRouter.delete(
  "/:id",
  validateRequest({ params: RequestParams }),
  appointmentController.deleteAppointment
);

export default appointmentRouter;
