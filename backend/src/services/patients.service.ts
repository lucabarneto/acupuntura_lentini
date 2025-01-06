import { patientDAO } from "../database/patients.dao.ts";
import IPatient from "../interfaces/IPatient.interface.ts";
import { BaseService } from "./base.service.ts";
import ID from "../interfaces/ID.interface.ts";

class Patient extends BaseService<IPatient, typeof patientDAO> {
  getByIdAndAddChiefComplaint = async (
    patient_id: ID,
    chief_complaint_id: ID
  ): Promise<IPatient> => {
    try {
      const patient = await patientDAO.getById(patient_id);

      if (patient.status === "error") throw patient.error;

      const result = await this.addChiefComplaint(
        { patient_id, chief_complaint_id },
        patient.payload
      );

      return result;
    } catch (err) {
      throw err;
    }
  };

  getByIdAndAddAppointment = async (
    patient_id: ID,
    appointment_id: ID
  ): Promise<IPatient> => {
    try {
      const patient = await patientDAO.getById(patient_id);
      if (patient.status === "error") throw patient.error;
      const result = await this.addAppointment(
        { patient_id, appointment_id },
        patient.payload
      );
      return result;
    } catch (err) {
      throw err;
    }
  };

  private addChiefComplaint = async (
    ids: { patient_id: ID; chief_complaint_id: ID },
    patient: IPatient
  ) => {
    patient.chief_complaints.push({
      chief_complaint: ids.chief_complaint_id,
    });
    const result = await patientDAO.update(ids.patient_id, patient);
    if (result.status === "error") throw result.error;
    return result.payload;
  };

  private addAppointment = async (
    ids: { patient_id: ID; appointment_id: ID },
    patient: IPatient
  ) => {
    patient.appointments.push({ appointment: ids.appointment_id });
    const result = await patientDAO.update(ids.patient_id, patient);
    if (result.status === "error") throw result.error;
    return result.payload;
  };

  findEqual = (data: IPatient, patients: IPatient[]): boolean =>
    patients.some(
      (patient) =>
        patient.first_name.toLowerCase() === data.first_name.toLowerCase() &&
        patient.last_name.toLowerCase() === data.last_name.toLowerCase()
    );
}

export const patientService = new Patient(patientDAO);
