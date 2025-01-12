import mongoose from "mongoose";
import { IChiefComplaint } from "../types/mongo/IChiefComplaint.ts";
import { ModelMiddlewares } from "./modelMiddlewares.ts";
import { sessionMiddlewares } from "./session.model.ts";
import { patientMiddlewares } from "./patient.model.ts";
import { reportMiddlewares } from "./report.model.ts";

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
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patients",
    required: true,
  },
  report: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "reports",
  },
  sessions: [SessionRefSchema],
});

/* :: Schema middlewares :: */

ChiefComplaintSchema.pre("deleteOne", async function () {
  const chiefComplaint = (await this.model.findOne(
    this.getQuery()
  )) as IChiefComplaint;

  if (chiefComplaint.sessions.length !== 0)
    await sessionMiddlewares.deleteNestedReferencesOffDatabase(
      chiefComplaint.sessions
    );

  await patientMiddlewares.removeDeletedReferenceFromDocument(
    {
      ref_id: chiefComplaint._id!,
      ref_key: "chief_complaints",
      isInsideArray: true,
    },
    chiefComplaint.patient.toString()
  );

  if (chiefComplaint.report) {
    await reportMiddlewares.removeDeletedReferenceFromDocument(
      {
        ref_id: chiefComplaint._id!,
        ref_key: "chief_complaints",
        isInsideArray: false,
      },
      chiefComplaint.report.toString()
    );
  }
});

ChiefComplaintSchema.pre("find", function () {
  this.populate(["sessions.session"]);
});

ChiefComplaintSchema.pre("save", async function () {
  await patientMiddlewares.checkForNonExistingDocument(this.patient.toString());

  await patientMiddlewares.addReferenceToDocument(
    { ref_id: this._id, ref_key: "chief_complaints", isInsideArray: true },
    this.patient.toString()
  );
});

export const ChiefComplaintModel = mongoose.model<
  IChiefComplaint,
  ChiefComplaintModel
>(CHIEF_COMPLAINT_COLLECTION, ChiefComplaintSchema);

class ChiefComplaintMiddlewares extends ModelMiddlewares<IChiefComplaint> {}

export const chiefComplaintMiddlewares = new ChiefComplaintMiddlewares(
  ChiefComplaintModel
);
