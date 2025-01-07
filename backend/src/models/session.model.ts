import mongoose from "mongoose";
import ISession from "../types/mongo/ISession.ts";

type SessionModel = mongoose.Model<ISession>;

const SESSION_COLLECTION = "sessions";

const SessionSchema = new mongoose.Schema<ISession, SessionModel>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
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
  appointment: {
    type: mongoose.Schema.ObjectId,
    ref: "appointments",
    required: true,
  },
});

export const SessionModel = mongoose.model<ISession, SessionModel>(
  SESSION_COLLECTION,
  SessionSchema
);
