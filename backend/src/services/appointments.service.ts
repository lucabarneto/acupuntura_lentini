import { appointmentDAO } from "../database/appointments.dao.ts";
import IAppointment from "../interfaces/IAppointment.interface.ts";
import ID from "../interfaces/ID.interface.ts";

export default class Appointment {
  getAll = async () => {
    const result = await appointmentDAO.getAll();

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  getById = async (id: ID) => {
    const result = await appointmentDAO.getById(id);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  create = async (appointment: IAppointment) => {
    const result = await appointmentDAO.create(appointment);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  update = async (id: ID, update: IAppointment) => {
    const result = await appointmentDAO.update(id, update);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  delete = async (id: ID) => {
    const result = await appointmentDAO.delete(id);
    if (result.status === "error") throw result.error;

    return result.payload;
  };
}
