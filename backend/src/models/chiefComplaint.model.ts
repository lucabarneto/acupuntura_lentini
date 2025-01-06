import mongoose from "mongoose";
import IChiefComplaint from "../types/IChiefComplaint.interface.ts";

type ChiefComplaintModel = mongoose.Model<IChiefComplaint>;

const CHIEF_COMPLAINT_COLLECTION = "chief_complaints";

const SessionRefSchema = new mongoose.Schema(
  {
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sessions",
    },
  },
  { _id: false }
);

const ChiefComplaintSchema = new mongoose.Schema<IChiefComplaint>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "patients",
    required: true,
  },
  patient_evolution: [SessionRefSchema],
});

ChiefComplaintSchema.pre("find", function () {
  this.populate(["patient_evolution.session"]);
});

export const ChiefComplaintModel = mongoose.model<
  IChiefComplaint,
  ChiefComplaintModel
>(CHIEF_COMPLAINT_COLLECTION, ChiefComplaintSchema);
