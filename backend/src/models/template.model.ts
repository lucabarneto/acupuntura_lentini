import mongoose from "mongoose";

const TEMPLATE_COLLECTION = "templates";

const TemplateSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: String,
  category: {
    type: String,
    enum: ["default", "custom"],
    require: true,
  },
  resources: [
    {
      resource: {
        type: mongoose.Schema.ObjectId,
        ref: "resources",
      },
    },
  ],
});

TemplateSchema.pre("find", function () {
  this.populate("resources.resource");
});

export const TemplateModel = mongoose.model(
  TEMPLATE_COLLECTION,
  TemplateSchema
);
