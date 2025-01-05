import mongoose from "mongoose";
import IResource from "../interfaces/IResource.interface.ts";

type ResourceModel = mongoose.Model<IResource>;

const RESOURCES_COLLECTION = "resources";

const ResourseSchema = new mongoose.Schema<IResource, ResourceModel>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default: "",
  },
  input_values: [String],
});

export const ResourceModel = mongoose.model<IResource, ResourceModel>(
  RESOURCES_COLLECTION,
  ResourseSchema
);
