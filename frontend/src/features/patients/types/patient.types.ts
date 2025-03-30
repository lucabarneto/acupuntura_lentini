import { ChiefComplaintRef } from "../../chief_complaints/types/chief_complaint.types";
import { BaziTableType } from "./bazi_table.types";
import { PresumptiveAnalysisType } from "./presumptive_analysis.types";

export interface IPatient {
  _id: string;
  first_name: string;
  last_name: string;
  age: string;
  mail: string;
  marital_status: "casado" | "soltero" | "casada" | "soltera";
  tel: string;
  profile_picture: string;
  birth?: BirthType;
  bazi_table?: BaziTableType;
  presumptive_analysis?: PresumptiveAnalysisType;
  next_appointment?: number;
  chief_complaints: ChiefComplaintRef[];
  appointments?: AppointmentsRef[];
  reports?: ReportsRef[];
}

export type BirthType = {
  date: string;
  time: string;
  location: string;
};

export type IPatientNoId = Omit<IPatient, "_id">;

export type IPatientForm = {
  first_name: string;
  last_name: string;
  age: string;
  mail: string;
  marital_status: string;
  tel: string;
  profile_picture: string | File;
  birth: {
    date: string;
    time: string;
    location: string;
  };
};

interface AppointmentsRef {
  appointment: string;
  date: number;
}

interface ReportsRef {
  report: string;
}
