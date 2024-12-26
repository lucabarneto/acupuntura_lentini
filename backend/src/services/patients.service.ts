import PatientDAO from "../database/patients.dao.ts";
import IPatient from "../interfaces/IPatient.interface.ts";

const patientDAO = new PatientDAO();

export default class Patient {
  async getAll() {
    const result = await patientDAO.getAll();

    if (result.status === "error") throw result.error;

    return result.payload;
  }

  async getById(id: string) {
    const result = await patientDAO.getById(id);

    if (result.status === "error") throw result.error;

    return result.payload;
  }

  async create(patient: IPatient) {
    const result = await patientDAO.create(patient);

    if (result.status === "error") throw result.error;

    return result.payload;
  }

  async update(id: string, update: IPatient) {
    const result = await patientDAO.update(id, update);

    if (result.status === "error") throw result.error;

    return result.payload;
  }

  async delete(id: string) {
    const result = await patientDAO.delete(id);
    if (result.status === "error") throw result.error;

    return result.payload;
  }
}
