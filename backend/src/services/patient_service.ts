import PatientDAO from "../database/patients.dao.ts";
import { IPatient } from "../interfaces/patient.interface.ts";

const patientDAO = new PatientDAO();

export default class Patient {
  async getAllPatients() {
    try {
      const patients = await patientDAO.getAll();

      if (patients.status === "error") throw patients.error;

      return patients.payload;
    } catch (error) {
      return { status: "error", error };
    }
  }

  async getPatientById(id: string) {
    try {
      const patient = await patientDAO.getById(id);

      if (patient.status === "error") throw patient.error;

      return patient.payload;
    } catch (error) {
      return { status: "error", error };
    }
  }

  async createPatient(patient: IPatient) {
    try {
      const newPatient = await patientDAO.create(patient);

      if (newPatient.status === "error") throw newPatient.error;

      return newPatient.payload;
    } catch (error) {
      return { status: "error", error };
    }
  }

  async updatePatient(id: string, update: object) {
    try {
      const updatedPatient = await patientDAO.update(id, update);

      if (updatedPatient.status === "error") throw updatedPatient.error;

      const patient = await patientDAO.getById(id);

      if (patient.status === "error") throw patient.error;

      return patient.payload;
    } catch (error) {
      return { status: "error", error };
    }
  }

  async deletePatient(id: string) {
    try {
      const isDeleted = await patientDAO.delete(id);

      if (isDeleted.status === "error") throw isDeleted.error;

      return isDeleted.payload;
    } catch (error) {
      return { status: "error", error };
    }
  }
}
