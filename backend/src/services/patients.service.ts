import { patientDAO } from "../database/patients.dao.ts";
import IPatient from "../types/mongo/IPatient.ts";
import { BaseService } from "./base.service.ts";
import ID from "../types/general/ID.interface.ts";

class Patient extends BaseService<IPatient, typeof patientDAO> {
  addChiefComplaintToPatient = async (
    ids: { patient_id: ID; chief_complaint_id: ID },
    patient: IPatient
  ): Promise<void> => {
    patient.chief_complaints.push({
      chief_complaint: ids.chief_complaint_id,
    });
    const result = await patientDAO.update(ids.patient_id, patient);
    if (result.status === "error") throw result.error;
  };

  addAppointmentToPatient = async (
    ids: { patient_id: ID; appointment_id: ID },
    patient: IPatient
  ): Promise<void> => {
    patient.appointments.push({ appointment: ids.appointment_id });
    const result = await patientDAO.update(ids.patient_id, patient);
    if (result.status === "error") throw result.error;
  };

  findEqual = (data: IPatient, patients: IPatient[]): boolean =>
    patients.some(
      (patient) =>
        patient.first_name.toLowerCase() === data.first_name.toLowerCase() &&
        patient.last_name.toLowerCase() === data.last_name.toLowerCase()
    );
}

export const patientService = new Patient(patientDAO);
