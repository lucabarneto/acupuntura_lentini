import { IPatient } from "../types/mongo/IPatient.ts";
import { IChiefComplaint } from "../types/mongo/IChiefComplaint.ts";
import { IAppointment } from "../types/mongo/IAppointment.ts";
import { patientDAO } from "../database/patients.dao.ts";
import { BaseService } from "./base.service.ts";
import { chiefComplaintService } from "./chiefComplaints.service.ts";
import { appointmentService } from "./appointments.service.ts";

class Patient extends BaseService<IPatient, typeof patientDAO> {
  addNewChiefComplaint = async (data: IChiefComplaint, patient: IPatient) => {
    const newChiefComplaint = await chiefComplaintService.create(data);

    patient.chief_complaints.push({ chief_complaint: newChiefComplaint._id! });

    const result = await patientDAO.update(patient._id!, patient);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  addNewAppointment = async (data: IAppointment, patient: IPatient) => {
    const newAppointment = await appointmentService.create(data);

    patient.appointments.push({ appointment: newAppointment._id! });

    const result = await patientDAO.update(patient._id!, patient);

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
