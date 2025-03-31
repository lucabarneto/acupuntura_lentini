import { ConsultationRef } from "../../consultations/types/consultation.types";

export type IChiefComplaint = {
  _id: string;
  title: string;
  diagnosis: string;
  initial_sleep_condition: string;
  initial_medicine: string;
  state: "finished" | "in_progress" | "abandoned";
  patient: string;
  consultations: ConsultationRef[]
};

export type IChiefComplaintNoId = Omit<IChiefComplaint, "_id">;

export type IChiefComplaintForm = {
  title: string;
  diagnosis: string;
  initial_sleep_condition: string;
  initial_medicine: string;
  patient: string;
};

export interface ChiefComplaintRef {
  chief_complaint: IChiefComplaint;
}
