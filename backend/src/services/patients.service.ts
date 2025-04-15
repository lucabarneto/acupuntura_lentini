import { IPatient } from "../types/mongo/IPatient.js";
import { patientDAO } from "../database/patients.dao.js";
import { BaseService } from "./base.service.js";

class Patient extends BaseService<IPatient> {
  findEqual = (data: IPatient, patients: IPatient[]): boolean =>
    patients.some(
      (patient) =>
        patient.first_name.toLowerCase() === data.first_name.toLowerCase() &&
        patient.last_name.toLowerCase() === data.last_name.toLowerCase()
    );
}

export const patientService = new Patient(patientDAO);
