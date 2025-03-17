import { z } from "zod";
import { MONGO_ID_REGEX, MIN_DATE } from "../../constants.ts";

const TableProps = z.enum(["hour", "day", "month", "year"]);

const Stems = z.enum([
  "Madera Yin",
  "Madera Yang",
  "Fuego Yin",
  "Fuego Yang",
  "Tierra Yin",
  "Tierra Yang",
  "Metal Yin",
  "Metal Yang",
  "Agua Yin",
  "Agua Yang",
  "",
]);

const Branches = z.enum([
  "Rata Zi",
  "Buey Chou",
  "Tigre Yin",
  "Conejo Mau",
  "Dragon Chen",
  "Serpiente Si",
  "Caballo Wu",
  "Cabra Wei",
  "Mono Shen",
  "Gallo You",
  "Perro Xu",
  "Cerdo Hai",
  "",
]);

const BaziTable = z.object({
  heavenly_stems: z.record(TableProps, Stems).optional(),
  earthly_branches: z.record(TableProps, Branches).optional(),
  hidden_stems: z
    .object({
      first_row: z.record(TableProps, Stems).optional(),
      second_row: z.record(TableProps, Stems).optional(),
      third_row: z.record(TableProps, Stems).optional(),
    })
    .optional(),
});

const Birth = z
  .object({
    date: z.string().date(),
    time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    location: z.string(),
  })
  .optional();

const PresumptiveAnalysis = z
  .object({
    meridian_time: z.string(),
    feeding: z.string(),
    yin: z.string(),
    yang: z.string(),
    qi: z.string(),
    xue: z.string(),
    jin_ye: z.string(),
    mental_vitality_jing_shen: z.string(),
    ancestral_jing: z.string(),
  })
  .optional();

export const IPatient = z.object({
  _id: z.string().regex(MONGO_ID_REGEX).optional(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  age: z.string(),
  mail: z.string().email(),
  marital_status: z.enum(["casado", "soltero", "casada", "soltera"]),
  tel: z.string(),
  profile_picture: z.string().optional(),
  birth: Birth,
  bazi_table: BaziTable.optional(),
  presumptive_analysis: PresumptiveAnalysis,
  next_appointment: z.number().min(MIN_DATE).optional(),
  chief_complaints: z
    .object({
      chief_complaint: z.string().regex(MONGO_ID_REGEX, {
        message: "Invalid Chief Complaint ID",
      }),
    })
    .array()
    .default([]),
  appointments: z
    .object({
      appointment: z.string().regex(MONGO_ID_REGEX, {
        message: "Invalid Appointment ID",
      }),
      date: z.number().min(MIN_DATE),
    })
    .array()
    .default([]),
  reports: z
    .object({
      report: z.string().regex(MONGO_ID_REGEX, {
        message: "Invalid Report ID",
      }),
    })
    .array()
    .default([]),
});

export type IPatient = z.infer<typeof IPatient>;
