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
    hour: Stems;
    day: Stems;
    month: Stems;
    year: Stems;
  };
  earthly_branches: {
    hour: Branches;
    day: Branches;
    month: Branches;
    year: Branches;
  };
  hidden_stems: {
    first_row: {
      hour: Stems;
      day: Stems;
      month: Stems;
      year: Stems;
    };
    second_row: {
      hour: Stems;
      day: Stems;
      month: Stems;
      year: Stems;
    };
    third_row: {
      hour: Stems;
      day: Stems;
      month: Stems;
      year: Stems;
    };
  };
};

type TableProps = "hour" | "day" | "month" | "year";

type Stems =
  | "Madera Yin"
  | "Madera Yang"
  | "Fuego Yin"
  | "Fuego Yang"
  | "Tierra Yin"
  | "Tierra Yang"
  | "Metal Yin"
  | "Metal Yang"
  | "Agua Yin"
  | "Agua Yang"
  | "";

type Branches =
  | "Rata Zi"
  | "Buey Chou"
  | "Tigre Yin"
  | "Conejo Mau"
  | "Dragon Chen"
  | "Serpiente Si"
  | "Caballo Wu"
  | "Cabra Wei"
  | "Mono Shen"
  | "Gallo You"
  | "Perro Xu"
  | "Cerdo Hai"
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
