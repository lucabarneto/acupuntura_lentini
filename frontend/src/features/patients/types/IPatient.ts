/* eslint-disable @typescript-eslint/no-explicit-any */
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

export interface BaziTableType {
  heavenly_stems: Record<TableProps, Stems>;
  earthly_branches: Record<TableProps, Branches>;
  hidden_stems: {
    first_row: Record<TableProps, Stems>;
    second_row: Record<TableProps, Stems>;
    third_row: Record<TableProps, Stems>;
  };
}

export type BaziTableForm = {
  heavenly_stems: {
    hour: string;
    day: string;
    month: string;
    year: string;
  };
  earthly_branches: {
    hour: string;
    day: string;
    month: string;
    year: string;
  };
  hidden_stems: {
    first_row: {
      hour: string;
      day: string;
      month: string;
      year: string;
    };
    second_row: {
      hour: string;
      day: string;
      month: string;
      year: string;
    };
    third_row: {
      hour: string;
      day: string;
      month: string;
      year: string;
    };
  };
};

type TableProps = "hour" | "day" | "month" | "year";

type Stems =
  | "madera yin"
  | "madera yang"
  | "fuego yin"
  | "fuego yang"
  | "tierra yin"
  | "tierra yang"
  | "metal yin"
  | "metal yang"
  | "agua yin"
  | "agua yang"
  | "";

type Branches =
  | "rata zi"
  | "buey chou"
  | "tigre yin"
  | "conejo mau"
  | "dragon chen"
  | "serpiente si"
  | "caballo wu"
  | "cabra wei"
  | "mono shen"
  | "gallo you"
  | "perro xu"
  | "cerdo hai"
  | "";

export interface IPatientTemplate {
  [key: string]: any;
  birth?: {
    [key: string]: any;
  };
  presumptive_analysis?: {
    [key: string]: any;
  };
}
