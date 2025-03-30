import { ResourceRef } from "../../resources/types/resource.types";

export type IConsultation = {
  _id: string;
  date: string;
  treatment: string;
  evolution: string;
  patient_tongue_image: string;
  chief_complaint: string;
  resources: ResourceRef[];
};

export type IConsultationNoId = Omit<IConsultation, "_id">;

export type IConsultationForm = {
  _id: string;
  date: string;
  treatment: string;
  evolution: string;
  patient_tongue_image: string;
  chief_complaint: string;
  resources: string[];
};

export type IConsultationDTO = {
  date: string;
  treatment: string;
  evolution: string;
  patient_tongue_image: string;
  chief_complaint: string;
  resources: { resource: string }[];
};
