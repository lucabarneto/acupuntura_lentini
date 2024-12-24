import { PatientModel } from "../models/patient.model.ts";
import IPatient from "../interfaces/IPatient.interface.ts";
import { UpdateQuery } from "mongoose";

export default class PatientDAO {
  async getAll() {
    try {
      const patients = (await PatientModel.find()) as IPatient[];
      return { status: "success", payload: patients };
    } catch (error) {
      return { status: "error", error };
    }
  }

  async getById(id: string) {
    try {
      const patient = (await PatientModel.findById(id)) as IPatient;

      return { status: "success", payload: patient };
    } catch (error) {
      return { status: "error", error };
    }
  }

  async create(data: IPatient) {
    try {
      const patient = (await PatientModel.create(data)) as IPatient;

      return { status: "success", payload: patient };
    } catch (error) {
      return { status: "error", error };
    }
  }

  async update(id: string, update: UpdateQuery<IPatient>) {
    try {
      const result = (await PatientModel.findOneAndReplace(
        { _id: id },
        update,
        {
          returnDocument: "after",
        }
      )) as IPatient;

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
