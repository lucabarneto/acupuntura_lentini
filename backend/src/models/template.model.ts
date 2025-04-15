import mongoose from "mongoose";
import { ITemplate } from "../types/mongo/ITemplate.js";

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
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  resources: [ResourceRefSchema],
});

TemplateSchema.pre("find", function () {
  this.populate("resources.resource");
});

TemplateSchema.pre("findOne", function () {
  this.populate("resources.resource");
});

export const TemplateModel = mongoose.model<ITemplate, TemplateModel>(
  TEMPLATE_COLLECTION,
  TemplateSchema
);
