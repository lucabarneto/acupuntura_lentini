import { IChiefComplaint } from "../../chief_complaints/types/chief_complaint.types";
import { IPatient } from "../../patients/types/patient.types";

export type IReport = {
  _id: string;
  creation_date: number;
  diagnosis: string;
  treatment: string;
  last_recorded_evolution: string;
  initial_patient_tongue: string | File;
  last_recorded_patient_tongue: string | File;
  patient: IPatient;
  chief_complaint: IChiefComplaint;
};

export type IReportForm = {
  creation_date: number;
  diagnosis: string;
  treatment: string;
  last_recorded_evolution: string;
  initial_patient_tongue: string | File;
  last_recorded_patient_tongue: string | File;
  patient: string;
  chief_complaint: string;
};
