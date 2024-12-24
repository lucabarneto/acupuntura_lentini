import mongoose from "mongoose";
import IPatient from "../interfaces/IPatient.interface.ts";

type PatientModel = mongoose.Model<IPatient>;

const PATIENTS_COLLECTION = "patients";

const BaziTableSchema = new mongoose.Schema(
  {
    heavenly_stems: {
      hour: String,
      day: String,
      month: String,
      year: String,
    },
    earthly_branches: {
      hour: String,
      day: String,
      month: String,
      year: String,
    },
    hidden_stems: {
      hour: Array,
      day: Array,
      month: Array,
      year: Array,
    },
  },
  { _id: false }
);

const BirthSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    bazi_table: BaziTableSchema,
  },
  { _id: false }
);

const PresumptiveAnalysisSchema = new mongoose.Schema(
  {
    meridian_time: String,
    feeding: String,
    yin: String,
    yang: String,
    qi: String,
    xue: String,
    jin_ye: String,
    mental_vitality_jing_shen: String,
    ancestral_jing: String,
  },
  { _id: false }
);

const PatientSchema = new mongoose.Schema<IPatient, PatientModel>({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  marital_status: {
    type: String,
    enum: ["married", "single"],
    required: true,
  },
  tel: {
    type: Number,
    required: true,
  },
  profile_picture: String,
  birth: BirthSchema,
  presumptive_analysis: PresumptiveAnalysisSchema,
});

// PatientSchema.pre("find", function () {
//   this.populate([
//     "chief_complaints.chief_complaint",
//     "appointments.appointment",
//     "reports.report",
//   ]);
// });

export const PatientModel = mongoose.model<IPatient, PatientModel>(
  PATIENTS_COLLECTION,
  PatientSchema
);
