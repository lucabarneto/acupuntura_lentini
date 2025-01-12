import mongoose from "mongoose";
import { IPatient } from "../types/mongo/IPatient.ts";
import { ModelMiddlewares } from "./modelMiddlewares.ts";
import { chiefComplaintMiddlewares } from "./chiefComplaint.model.ts";
import { appointmentMiddlewares } from "./appoinment.model.ts";
import { reportMiddlewares } from "./report.model.ts";
import { DATE_REGEX, TIME_REGEX } from "../constants/constants.ts";

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
      match: DATE_REGEX,
    },
    time: {
      type: String,
      match: TIME_REGEX,
    },
    location: {
      type: String,
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

const ChiefComplaintsRefSchema = new mongoose.Schema(
  {
    chief_complaint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chief_complaints",
    },
  },
  { _id: false }
);

const AppointmentRefSchema = new mongoose.Schema(
  {
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointments",
    },
  },
  { _id: false }
);

const ReportsRefSchema = new mongoose.Schema(
  {
    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reports",
    },
  },
  { _id: false }
);

const PatientSchema = new mongoose.Schema<IPatient, PatientModel>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
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
  chief_complaints: [ChiefComplaintsRefSchema],
  appointments: [AppointmentRefSchema],
  reports: [ReportsRefSchema],
});

/* :: Schema middlewares :: */

PatientSchema.pre("deleteOne", async function () {
  const patient = (await this.model.findOne(this.getQuery())) as IPatient;

  if (patient.chief_complaints.length !== 0)
    await chiefComplaintMiddlewares.deleteNestedReferencesOffDatabase(
      patient.chief_complaints
    );

  if (patient.appointments.length !== 0)
    await appointmentMiddlewares.deleteNestedReferencesOffDatabase(
      patient.appointments
    );

  if (patient.reports.length !== 0)
    await reportMiddlewares.deleteNestedReferencesOffDatabase(patient.reports);
});

PatientSchema.pre("find", function () {
  this.populate([
    "chief_complaints.chief_complaint",
    "appointments.appointment",
    "reports.report",
  ]);
});

export const PatientModel = mongoose.model<IPatient, PatientModel>(
  PATIENTS_COLLECTION,
  PatientSchema
);

class PatientMiddlewares extends ModelMiddlewares<IPatient> {}

export const patientMiddlewares = new PatientMiddlewares(PatientModel);
