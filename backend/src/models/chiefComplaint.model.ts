import mongoose from "mongoose";
import IChiefComplaint from "../interfaces/IChiefComplaint.interface.ts";

type ChiefComplaintModel = mongoose.Model<IChiefComplaint>;

const CHIEF_COMPLAINT_COLLECTION = "chief_complaints";

const ChiefComplaintSchema = new mongoose.Schema<IChiefComplaint>({
  title: String,
  description: String,
  diagnosis: String,
  initial_sleep_condition: String,
  initial_medicine: String,
  state: {
    type: String,
    enum: ["finished", "in_progress"],
  },
});

export const ChiefComplaintModel = mongoose.model<
  IChiefComplaint,
  ChiefComplaintModel
>(CHIEF_COMPLAINT_COLLECTION, ChiefComplaintSchema);
