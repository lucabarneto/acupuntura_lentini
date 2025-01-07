import { appointmentDAO } from "../database/appointments.dao.ts";
import IAppointment from "../types/mongo/IAppointment.ts";
import ID from "../types/general/ID.interface.ts";
import { BaseService } from "./base.service.ts";
import { Types } from "mongoose";

class AppointmentService extends BaseService<
  IAppointment,
  typeof appointmentDAO
> {
  addSessionToAppointment = async (
    ids: { appointment_id: ID; session_id: ID },
    appointment: IAppointment
  ): Promise<void> => {
    appointment.session = new Types.ObjectId(ids.session_id);
    const result = await appointmentDAO.update(ids.appointment_id, appointment);
    if (result.status === "error") throw result.error;
  };

  findEqual = (data: IAppointment, appointments: IAppointment[]) =>
    appointments.some(
      (appointment) =>
        appointment.patient.toString() === data.patient.toString() &&
        appointment.date === data.date &&
        appointment.time === data.time
    );
}

export const appointmentService = new AppointmentService(appointmentDAO);
