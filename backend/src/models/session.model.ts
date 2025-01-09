import mongoose from "mongoose";
import { ISession } from "../types/mongo/ISession.ts";
import { ChiefComplaintModel } from "./chiefComplaint.model.ts";

type SessionModel = mongoose.Model<ISession>;

const SESSION_COLLECTION = "sessions";

const SessionSchema = new mongoose.Schema<ISession, SessionModel>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  date: {
    type: String,
    match: /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
    required: true,
  },
  treatment: {
    type: String,
    required: true,
  },
  evolution: {
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
});

/* schema middlewares */

SessionSchema.pre("deleteOne", async function () {
  const session = (await this.model.findOne(this.getQuery())) as ISession;

  await ChiefComplaintModel.updateOne(
    { _id: session.chief_complaint },
    {
      $pull: {
        patient_evolution: { session: session._id!.toString() },
      },
    }
  );
});

export const SessionModel = mongoose.model<ISession, SessionModel>(
  SESSION_COLLECTION,
  SessionSchema
);
