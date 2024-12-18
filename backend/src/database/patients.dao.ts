import { UpdateQuery } from "mongoose";
import { PatientModel } from "../models/patient.model.ts";
import { IPatient } from "../interfaces/patient.interface.ts";

export default class PatientDAO {
  async getAll() {
    try {
      const patients = await PatientModel.find();

      return { status: "success", payload: patients };
    } catch (error) {
      return { status: "error", error };
    }
  }

  async getById(id: string) {
    try {
      const patient = await PatientModel.findById(id);

      return { status: "success", payload: patient };
    } catch (error) {
      return { status: "error", error };
    }
  }

  async create(data: IPatient) {
    try {
      const patient = await PatientModel.create(data);

      if (!patient) throw new Error("Patient was not created");

      return { status: "success", payload: patient };
    } catch (error) {
      return { status: "error", error };
    }
  }

  async update(id: string, update: UpdateQuery<IPatient>) {
    try {
      const result = await PatientModel.findOneAndReplace({ _id: id }, update, {
        returnDocument: "after",
      });

      return { status: "success", payload: result };
    } catch (error) {
      return { status: "error", error };
    }
  }

  async delete(id: string) {
    try {
      const result = await PatientModel.deleteOne({ _id: id });

      if (result.deletedCount === 0) throw new Error("Patient was not deleted");

      return { status: "success", payload: {} };
    } catch (error) {
      return { status: "error", error };
    }
  }
}
