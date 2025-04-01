import { IChiefComplaint } from "../../chief_complaints/types/chief_complaint.types";
import { IPatient } from "../../patients/types/patient.types";
import { ResourceRef } from "../../resources/types/resource.types";

export type IConsultation = {
  _id: string;
  date: string;
  treatment: string;
  evolution: string;
  patient_tongue_image: string;
  chief_complaint: IChiefComplaint;
  patient: IPatient;
  resources: ResourceRef[];
};

export type IConsultationNoId = Omit<IConsultation, "_id">;

export type IConsultationForm = {
  date: string;
  treatment: string;
  evolution: string;
  patient_tongue_image: string | File;
  chief_complaint: string;
  patient: string;
};

export type IConsultationDTO = {
  date: string;
  treatment: string;
  evolution: string;
  patient_tongue_image: string | File;
  chief_complaint: string;
  patient: string;
  resources: { resource: string }[];
};

export type ConsultationRef = {
  consultation: IConsultation;
};
