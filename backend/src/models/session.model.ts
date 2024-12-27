import mongoose from "mongoose";
import ISession from "../interfaces/ISession.interface.ts";

type SessionModel = mongoose.Model<ISession>;

const SESSION_COLLECTION = "sessions";

const SessionSchema = new mongoose.Schema<ISession, SessionModel>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  date: {
    type: String,
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
  chief_complaint: {
    type: mongoose.Schema.ObjectId,
    ref: "chief_complaints",
    required: true,
  },
});

export const SessionModel = mongoose.model<ISession, SessionModel>(
  SESSION_COLLECTION,
  SessionSchema
);
