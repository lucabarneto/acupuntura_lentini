import { Router } from "express";
import AppointmentController from "../controllers/appointments.controller.ts";
import IAppointment from "../types/IAppointment.interface.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import RequestParams from "../types/express/RequestParams.interface.ts";

const appointmentRouter = Router();
const appointmentController = new AppointmentController();

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
  appointmentController.createAppointmentAndAddToPatient
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
