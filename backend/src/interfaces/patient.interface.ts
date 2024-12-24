import { z } from "zod";

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

const IPatient = z.object({
  first_name: z.string(),
  last_name: z.string(),
  age: z.number().min(1),
  mail: z.string().email(),
  marital_status: z.enum(["single", "married"]),
  tel: z.number(),
  profile_picture: z.string().optional(),
  birth: Birth,
  presumptive_analysis: PresumptiveAnalysis,
});

type IPatient = z.infer<typeof IPatient>;

export default IPatient;
