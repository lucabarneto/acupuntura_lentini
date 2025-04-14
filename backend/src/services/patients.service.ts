import { IPatient } from "../types/mongo/IPatient";
import { patientDAO } from "../database/patients.dao";
import { BaseService } from "./base.service";

class Patient extends BaseService<IPatient> {
  findEqual = (data: IPatient, patients: IPatient[]): boolean =>
    patients.some(
      (patient) =>
        patient.first_name.toLowerCase() === data.first_name.toLowerCase() &&
        patient.last_name.toLowerCase() === data.last_name.toLowerCase()
    );
}

export const patientService = new Patient(patientDAO);
