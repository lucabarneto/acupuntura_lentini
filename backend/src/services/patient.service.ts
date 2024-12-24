import PatientDAO from "../database/patients.dao.ts";
import IPatient from "../interfaces/patient.interface.ts";
import { logger } from "../utils/logger.ts";

const patientDAO = new PatientDAO();

export default class Patient {
  async getAllPatients() {
    const result = await patientDAO.getAll();

    if (result.status === "error") throw result.error!;

    logger.http(`Patients found succesfully`);
    return result.payload!;
  }

  async getPatientById(id: string) {
    const result = await patientDAO.getById(id);

    if (result.status === "error") throw result.error!;

    logger.http(`Patient found succesfully (ID: ${id})`);
    return result.payload!;
  }

  async createPatient(patient: IPatient) {
    const result = await patientDAO.create(patient);

    if (result.status === "error") throw result.error!;

    logger.http(`Patient created succesfully`);
    return result.payload!;
  }

  async updatePatient(id: string, update: IPatient) {
    const updatedPatient = await patientDAO.update(id, update);

    if (updatedPatient.status === "error") throw updatedPatient.error!;

    logger.http(`Patient updated successfully (ID: ${id})`);
    return updatedPatient.payload!;
  }

  async deletePatient(id: string) {
    const result = await patientDAO.delete(id);

    if (result.status === "error") throw result.error!;

    logger.http(`Patient deleted successfully (ID was ${id})`);
    return result.payload!;
  }
}
