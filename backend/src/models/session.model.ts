import mongoose from "mongoose";
import { ISession } from "../types/mongo/ISession.ts";
import { chiefComplaintMiddlewares } from "./chiefComplaint.model.ts";
import { ModelMiddlewares } from "./modelMiddlewares.ts";

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
  chief_complaint: {
    type: mongoose.Schema.ObjectId,
    ref: "chief_complaints",
    required: true,
  },
});

/* :: Schema middlewares :: */

SessionSchema.pre("deleteOne", async function () {
  const session = (await this.model.findOne(this.getQuery())) as ISession;

  await chiefComplaintMiddlewares.removeDeletedReferenceFromDocument(
    { id: session._id!, key: "patient_evolution" },
    session.chief_complaint.toString()
  );
});

SessionSchema.pre("save", async function () {
  const chiefComplaint =
    await chiefComplaintMiddlewares.checkForNonExistingDocument(
      this.chief_complaint.toString()
    );

  await chiefComplaintMiddlewares.addReferenceToDocument(
    { id: this._id, key: "patient_evolution" },
    chiefComplaint
  );
});

export const SessionModel = mongoose.model<ISession, SessionModel>(
  SESSION_COLLECTION,
  SessionSchema
);

class SessionMiddlewares extends ModelMiddlewares<ISession> {}

export const sessionMiddlewares = new SessionMiddlewares(SessionModel);
