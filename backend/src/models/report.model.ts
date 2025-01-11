import mongoose from "mongoose";
import { IReport } from "../types/mongo/IReport.ts";
import { DATE_REGEX } from "../constants/constants.ts";

type ReportModel = mongoose.Model<IReport>;

const REPORT_COLLECTION = "reports";

const ReportSchema = new mongoose.Schema<IReport, ReportModel>({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  date: {
    type: String,
    require: true,
    match: DATE_REGEX,
  },
  treatment: {
    type: String,
    require: true,
  },
  diagnosis: {
    type: String,
    require: true,
  },
  last_recorded_evolution: {
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
  initial_patient_tongue: String,
  last_recorded_patient_tongue: String,
});

export const ReportModel = mongoose.model<IReport, ReportModel>(
  REPORT_COLLECTION,
  ReportSchema
);
