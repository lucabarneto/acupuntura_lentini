import { BaziTableType } from "./bazi_table.types";

export interface IPatient {
  _id: string;
  first_name: string;
  last_name: string;
  age: string;
  mail: string;
  marital_status: "casado" | "soltero" | "casada" | "soltera";
  tel: string;
  profile_picture: string;
  birth?: Birth;
  bazi_table?: BaziTableType;
  presumptive_analysis?: PresumptiveAnalysis;
  next_appointment?: number;
  chief_complaints?: ChiefComplaintRef[];
  appointments?: AppointmentsRef[];
  reports?: ReportsRef[];
}

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

interface ChiefComplaintRef {
  chief_complaint: string;
}

interface AppointmentsRef {
  appointment: string;
  date: number;
}

interface ReportsRef {
  report: string;
}

export type PresumptiveAnalysis = {
  meridian_time: string;
  feeding: string;
  yin: string;
  yang: string;
  qi: string;
  xue: string;
  jin_ye: string;
  mental_vitality_jing_shen: string;
  ancestral_jing: string;
};

export type Birth = {
  date: string;
  time: string;
  location: string;
};
