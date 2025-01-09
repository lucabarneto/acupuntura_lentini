import mongoose from "mongoose";
import { IChiefComplaint } from "../types/mongo/IChiefComplaint.ts";
import { PatientModel } from "./patient.model.ts";
import { SessionModel } from "./session.model.ts";

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

/* schema middlewares */

ChiefComplaintSchema.pre("deleteOne", async function () {
  const chiefComplaint = (await this.model.findOne(
    this.getQuery()
  )) as IChiefComplaint;

  await removeChiefComplaintFromPatient(chiefComplaint);
  await deleteChiefComplaintSessions(chiefComplaint);
});

const removeChiefComplaintFromPatient = async (
  chiefComplaint: IChiefComplaint
) => {
  await PatientModel.updateOne(
    { _id: chiefComplaint.patient },
    {
      $pull: {
        chief_complaints: { chief_complaint: chiefComplaint._id!.toString() },
      },
    }
  );
};

const deleteChiefComplaintSessions = async (
  chiefComplaint: IChiefComplaint
) => {
  for (let i = 0; i < chiefComplaint.patient_evolution.length; i++) {
    await SessionModel.deleteOne({
      _id: chiefComplaint.patient_evolution[i].session.toString(),
    });
  }
};

ChiefComplaintSchema.pre("find", function () {
  this.populate(["patient_evolution.session"]);
});

export const ChiefComplaintModel = mongoose.model<
  IChiefComplaint,
  ChiefComplaintModel
>(CHIEF_COMPLAINT_COLLECTION, ChiefComplaintSchema);
