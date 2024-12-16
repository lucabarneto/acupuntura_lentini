import mongoose from "mongoose";

const REPORT_COLLECTION = "reports";

const ReportSchema = new mongoose.Schema({
  date: {
    type: String,
    require: true,
  },
  treatment: {
    type: String,
    require: true,
  },
  last_evolution: {
    type: String,
    require: true,
  },
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: "patients",
  },
  chief_complaint: {
    type: mongoose.Schema.ObjectId,
    ref: "chief_complaints",
  },
  tongue_comparison: Array,
});

ReportSchema.pre("find", function () {
  this.populate(["patient", "chief_complaint"]);
});

export const ReportModel = mongoose.model(REPORT_COLLECTION, ReportSchema);
