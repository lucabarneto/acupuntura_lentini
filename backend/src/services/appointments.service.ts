import { IAppointment } from "../types/mongo/IAppointment.ts";
import { appointmentDAO } from "../database/appointments.dao.ts";
import { BaseService } from "./base.service.ts";

class AppointmentService extends BaseService<IAppointment> {
  findEqual = (data: IAppointment, appointments: IAppointment[]) =>
    appointments.some(
      (appointment) =>
        appointment.patient.toString() === data.patient.toString() &&
        appointment.date === data.date &&
        appointment.time === data.time
    );
}

export const appointmentService = new AppointmentService(appointmentDAO);
