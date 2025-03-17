import mongoose from "mongoose";
import { IPatient } from "../types/mongo/IPatient.ts";
import { ModelMiddlewares } from "./modelMiddlewares.ts";
import { chiefComplaintMiddlewares } from "./chiefComplaint.model.ts";
import { appointmentMiddlewares } from "./appoinment.model.ts";
import { reportMiddlewares } from "./report.model.ts";
import { DATE_REGEX, TIME_REGEX, MIN_DATE } from "../constants.ts";
import { ID } from "../types/general/ID.interface.ts";

type PatientModel = mongoose.Model<IPatient>;

const PATIENTS_COLLECTION = "patients";

const NEXT_APPOINTMENT_POSITION = 0;

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
      principal_qi: { hour: String, day: String, month: String, year: String },
      central_qi: { hour: String, day: String, month: String, year: String },
      residual_qi: { hour: String, day: String, month: String, year: String },
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
      required: true,
    },
    date: {
      type: Number,
      required: true,
      min: MIN_DATE,
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
    type: String,
    required: true,
  },

  mail: {
    type: String,
    required: true,
  },
  marital_status: {
    type: String,
    enum: ["casado", "soltero", "casada", "soltera"],
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  profile_picture: String,
  next_appointment: {
    type: Number,
    min: MIN_DATE,
  },
  birth: BirthSchema,
  bazi_table: BaziTableSchema,
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
      patient.chief_complaints,
      "chief_complaints"
    );

  if (patient.appointments.length !== 0)
    await appointmentMiddlewares.deleteNestedReferencesOffDatabase(
      patient.appointments,
      "appointments"
    );

  if (patient.reports.length !== 0)
    await reportMiddlewares.deleteNestedReferencesOffDatabase(
      patient.reports,
      "reports"
    );
});

PatientSchema.pre("findOne", function () {
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

class PatientMiddlewares extends ModelMiddlewares<IPatient> {
  setNextAppointment = async (
    appointments: any[],
    document_id: ID
  ): Promise<void> => {
    if (appointments.length === 0) return;

    const next_appointment =
      appointments.length === 1
        ? appointments[NEXT_APPOINTMENT_POSITION].date
        : appointments
            .filter((appointment) => appointment.date >= Date.now())
            .sort((a, b) => a.date - b.date)[NEXT_APPOINTMENT_POSITION].date;

    const result = await this.model.updateOne(
      { _id: document_id },
      { next_appointment }
    );

    if (result.matchedCount === 0)
      throw new Error(`Could not set next appointment to patient correctly`);
  };
}

export const patientMiddlewares = new PatientMiddlewares(PatientModel);
