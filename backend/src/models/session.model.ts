import mongoose from "mongoose";
import { ISession } from "../types/mongo/ISession.ts";
import { chiefComplaintMiddlewares } from "./chiefComplaint.model.ts";
import { ModelMiddlewares } from "./modelMiddlewares.ts";
import { DATE_REGEX } from "../constants/constants.ts";

type SessionModel = mongoose.Model<ISession>;

const SESSION_COLLECTION = "sessions";

const ResourceRefSchema = new mongoose.Schema(
  {
    resource: { type: mongoose.Types.ObjectId, ref: "resources" },
    selected_value: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const SessionSchema = new mongoose.Schema<ISession, SessionModel>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  date: {
    type: String,
    match: DATE_REGEX,
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
  patient_tongue: { type: String, default: "" },
  chief_complaint: {
    type: mongoose.Schema.ObjectId,
    ref: "chief_complaints",
    required: true,
  },
  resources: [ResourceRefSchema],
});

/* :: Schema middlewares :: */

SessionSchema.pre("deleteOne", async function () {
  const session = (await this.model.findOne(this.getQuery())) as ISession;

  await chiefComplaintMiddlewares.removeDeletedReferenceFromDocument(
    { ref_id: session._id!, ref_key: "sessions", isInsideArray: true },
    session.chief_complaint.toString()
  );
});

SessionSchema.pre("save", async function () {
  await chiefComplaintMiddlewares.checkForNonExistingDocument(
    this.chief_complaint.toString()
  );

  await chiefComplaintMiddlewares.addReferenceToDocument(
    { ref_id: this._id, ref_key: "sessions", isInsideArray: true },
    this.chief_complaint.toString()
  );
});

export const SessionModel = mongoose.model<ISession, SessionModel>(
  SESSION_COLLECTION,
  SessionSchema
);

class SessionMiddlewares extends ModelMiddlewares<ISession> {}

export const sessionMiddlewares = new SessionMiddlewares(SessionModel);
