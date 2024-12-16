import mongoose from "mongoose";

const CHIEF_COMPLAINT_COLLECTION = "chief_complaints";

const ChiefComplaintSchema = new mongoose.Schema({
  title: String,
  description: String,
  diagnosis: String,
  initial_sleep_condition: String,
  initial_medicine: String,
  state: {
    type: String,
    enum: ["finished", "in_progress"],
  },
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: "patients",
  },
  patient_evolution: [
    {
      session: {
        type: mongoose.Schema.ObjectId,
        ref: "sessions",
      },
    },
  ],
  report: {
    type: mongoose.Schema.ObjectId,
    ref: "reports",
  },
});

ChiefComplaintSchema.pre("find", function () {
  this.populate("patient_evolution.session", "patient", "report");
});

export const ChiefComplaintModel = mongoose.model(
  CHIEF_COMPLAINT_COLLECTION,
  ChiefComplaintSchema
);
