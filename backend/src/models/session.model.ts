import mongoose from "mongoose";

const SESSION_COLLECTION = "sessions";

const SessionSchema = new mongoose.Schema({
  date: {
    type: String,
    require: true,
  },
  treatment: {
    type: String,
    require: true,
  },
  evolution: {
    type: String,
    require: true,
  },
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: "patients",
  },
  chief_complaint: {
    type: mongoose.Schema.ObjectId,
    ref: "chief_complaints",
  },
  appointment: {
    type: mongoose.Schema.ObjectId,
    ref: "appointments",
  },
  resources: [
    {
      resource: {
        type: mongoose.Schema.ObjectId,
        ref: "resources",
      },
    },
  ],
  templates: [
    {
      template: {
        type: mongoose.Schema.ObjectId,
        ref: "templates",
      },
    },
  ],
});

SessionSchema.pre("find", function () {
  this.populate([
    "patient",
    "chief_complaint",
    "appointment",
    "resources.resource",
    "templates.template",
  ]);
});

export const SessionModel = mongoose.model(SESSION_COLLECTION, SessionSchema);
