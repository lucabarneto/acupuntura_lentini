import { IChiefComplaint } from "../../chief_complaints/types/chief_complaint.types";
import { IPatient } from "../../patients/types/patient.types";
import {
  IConsultationTechniques,
  IConsultationTechniquesDTO,
} from "./consultation_techniques.types";

export type IConsultation = {
  _id: string;
  date: string;
  treatment: string;
  evolution: string;
  patient_tongue_image: string;
  chief_complaint: IChiefComplaint;
  patient: IPatient;
  resources: IConsultationTechniques[];
};

export type IConsultationUpdate = {
  _id: string;
  date: string;
  treatment: string;
  evolution: string;
  patient_tongue_image: string;
  chief_complaint: IChiefComplaint;
  patient: IPatient;
  resources: IConsultationTechniquesDTO[];
};

export type IConsultationForm = {
  date: string;
  treatment: string;
  evolution: string;
  patient_tongue_image: string | File;
  chief_complaint: string;
  patient: string;
};

export type ConsultationRef = {
  consultation: IConsultation;
};
