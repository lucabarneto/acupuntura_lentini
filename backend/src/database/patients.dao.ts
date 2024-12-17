import { UpdateQuery } from "mongoose";

import { PatientModel } from "../models/patient.model.ts";
import { IPatient } from "../interfaces/patient.interface.ts";

export default class PatientDAO {
  async getAll() {
    try {
      console.log("Ejecutando método getAll() de PatientDAO");
      const patients = await PatientModel.find();

      return { status: "success", payload: patients };
    } catch (error) {
      console.log(
        "ERROR: Ocurrió un error en el método getAll de PatientDAO",
        error
      );
      return {
        status: "error",
        error: error,
      };
    }
  }

  async getById(id: string) {
    try {
      const patient = await PatientModel.findById(id);
      return { status: "success", payload: patient };
    } catch (error) {
      console.log("Ocurrió un error en el método getById de PatientDAO");
      return { status: "error", error };
    }
  }

  async create(data: IPatient) {
    try {
      const patient = await PatientModel.create(data);
      return { status: "success", payload: patient };
    } catch (error) {
      console.log("Ocurrió un error en el método create de PatientDAO");
      return { status: "error", error };
    }
  }

  async update(id: string, update: UpdateQuery<object>) {
    try {
      const patient = await PatientModel.updateOne(
        { _id: id },
        { $set: update }
      );
      console.log("success", patient);
      return { status: "success", payload: patient };
    } catch (error) {
      return { status: "error", error };
    }
  }

  async delete(id: string) {
    try {
      await PatientModel.deleteOne({ _id: id });
      return { status: "success", payload: true };
    } catch (error) {
      return { status: "error", error };
    }
  }
}
