import PatientDAO from "../database/patients.dao.ts";
import { IPatient } from "../interfaces/patient.interface.ts";
import { logger } from "../utils/logger.ts";

const patientDAO = new PatientDAO();

export default class Patient {
  async getAllPatients() {
    try {
      const patients = await patientDAO.getAll();

      if (patients.status === "error") throw patients.error;

      logger.debug(`Patients found succesfully`);
      return patients.payload;
    } catch (error) {
      logger.error(`There was an error while finding all patient: ${error}`);
      return { status: "error", error };
    }
  }

  async getPatientById(id: string) {
    try {
      const patient = await patientDAO.getById(id);

      if (patient.status === "error") throw patient.error;

      logger.debug(`Patient found succesfully (ID: ${id})`);
      return patient.payload;
    } catch (error) {
      logger.error(`There was an error while finding the patient: ${error}`);
      return { status: "error", error };
    }
  }

  async createPatient(patient: IPatient) {
    try {
      const newPatient = await patientDAO.create(patient);

      if (newPatient.status === "error") throw newPatient.error;

      logger.debug(`Patient created succesfully`);
      return newPatient.payload;
    } catch (error) {
      logger.error(`There was an error while creating the patient: ${error}`);
      return { status: "error", error };
    }
  }

  async updatePatient(id: string, update: IPatient) {
    try {
      const updatedPatient = await patientDAO.update(id, update);

      if (updatedPatient.status === "error") throw updatedPatient.error;

      logger.debug(`Patient updated successfully (ID: ${id})`);
      return updatedPatient.payload;
    } catch (error) {
      logger.error(`There was an error while updating the patient: ${error}`);
      return { status: "error", error };
    }
  }

  async deletePatient(id: string) {
    try {
      const isDeleted = await patientDAO.delete(id);

      if (isDeleted.status === "error") throw isDeleted.error;

      logger.debug(`Patient deleted successfully (ID was ${id})`);
      return isDeleted.payload;
    } catch (error) {
      logger.error(`There was an error while deleting the patient: ${error}`);
      return { status: "error", error };
    }
  }
}
