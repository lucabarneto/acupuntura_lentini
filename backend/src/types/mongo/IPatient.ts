import { z } from "zod";
import { MONGO_ID_REGEX } from "../../constants/constants.ts";

const TableProps = z.enum(["hour", "day", "month", "year"]);

const Stems = z.enum([
  "madera yin",
  "madera yang",
  "fuego yin",
  "fuego yang",
  "tierra yin",
  "tierra yang",
  "metal yin",
  "metal yang",
  "agua yin",
  "agua yang",
  "",
]);

const Branches = z.enum([
  "rata zi",
  "buey chou",
  "tigre yin",
  "conejo mau",
  "dragon chen",
  "serpiente si",
  "caballo wu",
  "cabra wei",
  "mono shen",
  "gallo you",
  "perro xu",
  "cerdo hai",
  "",
]);

const BaziTable = z
  .object({
    heavenly_stems: z.record(TableProps, Stems),
    earthly_branches: z.record(TableProps, Branches),
    hidden_stems: z.record(TableProps, z.tuple([Stems, Stems, Stems])),
  })
  .optional();

const Birth = z
  .object({
    date: z.string().date(),
    time: z.string().time(),
    location: z.string(),
    bazi_table: BaziTable,
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
  age: z.number().min(1),
  mail: z.string().email(),
  marital_status: z.enum(["single", "married"]),
  tel: z.number().min(1),
  profile_picture: z.string().optional(),
  birth: Birth,
  presumptive_analysis: PresumptiveAnalysis,
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
    })
    .array()
    .default([]),
});

export type IPatient = z.infer<typeof IPatient>;
