import { Router } from "express";
import { IAppointment } from "../types/mongo/IAppointment.ts";
import { AppointmentController } from "../controllers/appointments.controller.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { RequestParams } from "../types/express/RequestParams.ts";
import { authenticate } from "../middlewares/authenticate.ts";

const appointmentController = new AppointmentController();

export const appointmentRouter = Router();

appointmentRouter.param("id", appointmentController.handleId);

appointmentRouter.get(
  "/",
  authenticate("jwt", { session: false }),
  appointmentController.getAllAppointments
);

appointmentRouter.get(
  "/:id",
  authenticate("jwt", { session: false }),
  validateRequest({ params: RequestParams }),
  appointmentController.getAppointmentById
);

appointmentRouter.post(
  "/",
  authenticate("jwt", { session: false }),
  validateRequest({ body: IAppointment }),
  appointmentController.createAppointment
);

appointmentRouter.put(
  "/:id",
  authenticate("jwt", { session: false }),
  validateRequest({ params: RequestParams, body: IAppointment }),
  appointmentController.updateAppointment
);

appointmentRouter.delete(
  "/:id",
  authenticate("jwt", { session: false }),
  validateRequest({ params: RequestParams }),
  appointmentController.deleteAppointment
);
