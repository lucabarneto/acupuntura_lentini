import mongoose from "mongoose";
import { ITemplate } from "../types/mongo/ITemplate.ts";

type TemplateModel = mongoose.Model<ITemplate>;

const TEMPLATE_COLLECTION = "templates";

const ResourceRefSchema = new mongoose.Schema(
  {
    resource: {
      type: mongoose.Schema.ObjectId,
      ref: "resources",
    },
  },
  { _id: false }
);

const TemplateSchema = new mongoose.Schema<ITemplate, TemplateModel>({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  description: String,
  resources: [ResourceRefSchema],
});

/* schame middlewares */

export const TemplateModel = mongoose.model<ITemplate, TemplateModel>(
  TEMPLATE_COLLECTION,
  TemplateSchema
);
