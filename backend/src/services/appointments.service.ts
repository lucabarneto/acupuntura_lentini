import { IAppointment } from "../types/mongo/IAppointment";
import { appointmentDAO } from "../database/appointments.dao";
import { BaseService } from "./base.service";

class AppointmentService extends BaseService<IAppointment> {
  findEqual = (data: IAppointment, appointments: IAppointment[]): boolean =>
    appointments.some(
      (appointment) =>
        appointment.patient.toString() === data.patient.toString() &&
        appointment.date === data.date
    );
}

export const appointmentService = new AppointmentService(appointmentDAO);
