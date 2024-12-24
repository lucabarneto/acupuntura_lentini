import PatientDAO from "../database/patients.dao.ts";
import IPatient from "../interfaces/IPatient.interface.ts";

const patientDAO = new PatientDAO();

export default class Patient {
  async getAllPatients() {
    const result = await patientDAO.getAll();

    if (result.status === "error") throw result.error!;

    return result.payload!;
  }

  async getPatientById(id: string) {
    const result = await patientDAO.getById(id);

    if (result.status === "error") throw result.error!;

    return result.payload!;
  }

  async createPatient(patient: IPatient) {
    const result = await patientDAO.create(patient);

    if (result.status === "error") throw result.error!;

    return result.payload!;
  }

  async updatePatient(id: string, update: IPatient) {
    const updatedPatient = await patientDAO.update(id, update);

    if (updatedPatient.status === "error") throw updatedPatient.error!;

    return updatedPatient.payload!;
  }

  async deletePatient(id: string) {
    const result = await patientDAO.delete(id);

    if (result.status === "error") throw result.error!;

    return result.payload!;
  }
}
