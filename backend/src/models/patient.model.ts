import mongoose from "mongoose";

const PATIENTS_COLLECTION = "patients";

const PatientSchema = new mongoose.Schema({
  personal_data: {
    first_name: {
      type: String,
      require: true,
    },
    last_name: {
      type: String,
      require: true,
    },
    age: Number,
    mail: String,
    marital_status: {
      type: String,
      enum: ["married", "single"],
    },
    tel: Number,
    profile_picture: String,
  },
  birth: {
    date: String,
    time: String,
    location: String,
    bazi_table: {
      heavenly_stems: {
        hour: String,
        day: String,
        month: String,
        year: String,
      },
      earthly_branches: {
        hour: String,
        day: String,
        month: String,
        year: String,
      },
      hidden_stems: {
        hour: Array,
        day: Array,
        month: Array,
        year: Array,
      },
    },
  },
  presumptive_analysis: {
    meridian_time: String,
    feeding: String,
    yin: String,
    yang: String,
    qi: String,
    xue: String,
    jin_ye: String,
    mental_vitality_jing_shen: String,
    ancestral_jing: String,
  },
  // chief_complaints: [
  //   {
  //     chief_complaint: {
  //       type: mongoose.Schema.ObjectId,
  //       ref: "chief_complaints",
  //     },
  //   },
  // ],
  // appointments: [
  //   {
  //     appointment: {
  //       type: mongoose.Schema.ObjectId,
  //       ref: "appointments",
  //     },
  //   },
  // ],
  // reports: [
  //   {
  //     report: {
  //       type: mongoose.Schema.ObjectId,
  //       ref: "reports",
  //     },
  //   },
  // ],
});

// PatientSchema.pre("find", function () {
//   this.populate([
//     "chief_complaints.chief_complaint",
//     "appointments.appointment",
//     "reports.report",
//   ]);
// });

export const PatientModel = mongoose.model(PATIENTS_COLLECTION, PatientSchema);
