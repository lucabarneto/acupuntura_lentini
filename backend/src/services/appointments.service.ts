import { appointmentDAO } from "../database/appointments.dao.ts";
import IAppointment from "../interfaces/IAppointment.interface.ts";
import { BaseService } from "./base.service.ts";

class AppointmentService extends BaseService<
  IAppointment,
  typeof appointmentDAO
> {
  findEqual = (data: IAppointment, appointments: IAppointment[]) =>
    appointments.some(
      (appointment) =>
        appointment.patient.toString() === data.patient.toString() &&
        appointment.date === data.date &&
        appointment.time === data.time
    );
}

export const appointmentService = new AppointmentService(appointmentDAO);
