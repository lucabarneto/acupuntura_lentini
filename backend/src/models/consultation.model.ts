import mongoose from "mongoose";
import { IConsultation } from "../types/mongo/IConsultation.ts";
import { chiefComplaintMiddlewares } from "./chiefComplaint.model.ts";
import { ModelMiddlewares } from "./modelMiddlewares.ts";
import { DATE_REGEX } from "../constants.ts";

type ConsultationModel = mongoose.Model<IConsultation>;

const CONSULTATION_COLLECTION = "consultations";

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

const ConsultationSchema = new mongoose.Schema<
  IConsultation,
  ConsultationModel
>({
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

ConsultationSchema.pre("deleteOne", async function () {
  const consultation = (await this.model.findOne(
    this.getQuery()
  )) as IConsultation;

  await chiefComplaintMiddlewares.removeDeletedReferenceFromDocument(
    {
      ref_id: consultation._id!,
      ref_key: "consultations",
      isInsideArray: true,
    },
    consultation.chief_complaint.toString()
  );
});

ConsultationSchema.pre("save", async function () {
  await chiefComplaintMiddlewares.checkForNonExistingDocument(
    this.chief_complaint.toString()
  );

  await chiefComplaintMiddlewares.addReferenceToDocument(
    { ref_id: this._id, ref_key: "consultations", isInsideArray: true },
    this.chief_complaint.toString()
  );
});

export const ConsultationModel = mongoose.model<
  IConsultation,
  ConsultationModel
>(CONSULTATION_COLLECTION, ConsultationSchema);

class ConsultationMiddlewares extends ModelMiddlewares<IConsultation> {}

export const consultationMiddlewares = new ConsultationMiddlewares(
  ConsultationModel
);
