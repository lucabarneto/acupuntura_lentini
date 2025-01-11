import mongoose from "mongoose";
import { IChiefComplaint } from "../types/mongo/IChiefComplaint.ts";
import { ModelMiddlewares } from "./modelMiddlewares.ts";
import { sessionMiddlewares } from "./session.model.ts";
import { patientMiddlewares } from "./patient.model.ts";

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

/* :: Schema middlewares :: */

ChiefComplaintSchema.pre("deleteOne", async function () {
  const chiefComplaint = (await this.model.findOne(
    this.getQuery()
  )) as IChiefComplaint;

  if (chiefComplaint.patient_evolution.length !== 0)
    await sessionMiddlewares.deleteNestedReferencesOffDatabase(
      chiefComplaint.patient_evolution
    );

  await patientMiddlewares.removeDeletedReferenceFromDocument(
    {
      id: chiefComplaint._id!,
      key: "chief_complaints",
    },
    chiefComplaint.patient.toString()
  );
});

ChiefComplaintSchema.pre("find", function () {
  this.populate(["patient_evolution.session"]);
});

ChiefComplaintSchema.pre("save", async function () {
  const patient = await patientMiddlewares.checkForNonExistingDocument(
    this.patient.toString()
  );

  await patientMiddlewares.addReferenceToDocument(
    { id: this._id, key: "chief_complaints" },
    patient
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
