import mongoose from "mongoose";
import { IReport } from "../types/mongo/IReport.js";
import { ModelMiddlewares } from "./modelMiddlewares.js";
import { patientMiddlewares } from "./patient.model.js";
import { chiefComplaintMiddlewares } from "./chiefComplaint.model.js";
import { MIN_DATE } from "../constants.js";

type ReportModel = mongoose.Model<IReport>;

const REPORT_COLLECTION = "reports";

const ReportSchema = new mongoose.Schema<IReport, ReportModel>({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  creation_date: {
    type: Number,
    required: true,
    min: MIN_DATE,
  },
  treatment: {
    type: String,
    require: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  last_recorded_evolution: {
    type: String,
    required: true,
  },
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: "patients",
    required: true,
  },
  chief_complaint: {
    type: mongoose.Schema.ObjectId,
    ref: "chief_complaints",
    required: true,
  },
  initial_patient_tongue: String,
  last_recorded_patient_tongue: String,
});

/* :: Schema middlewares :: */

ReportSchema.pre("find", function () {
  this.populate("chief_complaint");
});

ReportSchema.pre("deleteOne", async function () {
  const report = (await this.model.findOne(this.getQuery())) as IReport;

  await patientMiddlewares.removeDeletedReferenceFromDocument(
    { ref_id: report._id!, ref_key: "reports", isInsideArray: true },
    report.patient.toString()
  );

  await chiefComplaintMiddlewares.removeDeletedReferenceFromDocument(
    { ref_id: report._id!, ref_key: "reports", isInsideArray: false },
    report.chief_complaint.toString()
  );
});

ReportSchema.pre("save", async function () {
  await patientMiddlewares.checkForNonExistingDocument(this.patient.toString());

  await chiefComplaintMiddlewares.checkForNonExistingDocument(
    this.chief_complaint.toString()
  );

  await patientMiddlewares.addReferenceToDocument(
    { ref_id: this._id, ref_key: "reports", isInsideArray: true },
    this.patient.toString()
  );

  await chiefComplaintMiddlewares.addReferenceToDocument(
    { ref_id: this._id, ref_key: "reports", isInsideArray: false },
    this.chief_complaint.toString()
  );
});

export const ReportModel = mongoose.model<IReport, ReportModel>(
  REPORT_COLLECTION,
  ReportSchema
);

class ReportMiddlewares extends ModelMiddlewares<IReport> {}
export const reportMiddlewares = new ReportMiddlewares(ReportModel);
