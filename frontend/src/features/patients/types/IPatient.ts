export interface IPatient {
  _id: string;
  first_name: string;
  last_name: string;
  age: string;
  mail: string;
  marital_status: "single" | "married";
  tel: string;
  profile_picture?: string;
  birth?: Birth;
  presumptive_analysis?: PresumptiveAnalysis;
  next_appointment?: number;
  chief_complaints: ChiefComplaintRef[];
  appointments: AppointmentsRef[];
  reports: ReportsRef[];
}

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

export interface PresumptiveAnalysis {
  meridian_time: string;
  feeding: string;
  yin: string;
  yang: string;
  qi: string;
  xue: string;
  jin_ye: string;
  mental_vitality_jing_shen: string;
  ancestral_jing: string;
}

interface Birth {
  date: string;
  time: string;
  location: string;
  bazi_table: BaziTable;
}

export interface BaziTable {
  heavenly_stems: Record<TableProps, Stems>;
  earthly_branches: Record<TableProps, Branches>;
  hidden_stems: Record<TableProps, [Stems, Stems, Stems]>;
}

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
