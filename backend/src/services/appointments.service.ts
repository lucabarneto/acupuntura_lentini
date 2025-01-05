import { appointmentDAO } from "../database/appointments.dao.ts";
import IAppointment from "../interfaces/IAppointment.interface.ts";
import { BaseService } from "./base.service.ts";

class AppointmentService extends BaseService<
  IAppointment,
  typeof appointmentDAO
> {}

export const appointmentService = new AppointmentService(appointmentDAO);
