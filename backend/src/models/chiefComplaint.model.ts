import mongoose from "mongoose";
import IChiefComplaint from "../interfaces/IChiefComplaint.interface.ts";

type ChiefComplaintModel = mongoose.Model<IChiefComplaint>;

const CHIEF_COMPLAINT_COLLECTION = "chief_complaints";

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
});

export const ChiefComplaintModel = mongoose.model<
  IChiefComplaint,
  ChiefComplaintModel
>(CHIEF_COMPLAINT_COLLECTION, ChiefComplaintSchema);
