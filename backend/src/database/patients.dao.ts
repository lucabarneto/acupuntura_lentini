import { UpdateQuery } from "mongoose";
import { PatientModel } from "../models/patient.model.ts";
import IPatient from "../interfaces/IPatient.interface.ts";
import { DAO, DAOReturnValue } from "../interfaces/Dao.interface.ts";

export default class PatientDAO implements DAO<IPatient> {
  async getAll(): Promise<DAOReturnValue<IPatient[]>> {
    try {
      const patients = (await PatientModel.find()) as IPatient[];
      return { status: "success", payload: patients };
    } catch (error) {
      return { status: "error", error };
    }
  }

  async getById(id: string): Promise<DAOReturnValue<IPatient>> {
    try {
      const patient = (await PatientModel.findById(id)) as IPatient;

      return { status: "success", payload: patient };
    } catch (error) {
      return { status: "error", error };
    }
  }

  async create(data: IPatient): Promise<DAOReturnValue<IPatient>> {
    try {
      const patient = (await PatientModel.create(data)) as IPatient;

      return { status: "success", payload: patient };
    } catch (error) {
      return { status: "error", error };
    }
  }

  async update(
    id: string,
    update: UpdateQuery<IPatient>
  ): Promise<DAOReturnValue<IPatient>> {
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

  async delete(id: string): Promise<DAOReturnValue<{}>> {
    try {
      const result = await PatientModel.deleteOne({ _id: id });

      if (result.deletedCount === 0) throw new Error("Patient was not deleted");

      return { status: "success", payload: {} };
    } catch (error) {
      return { status: "error", error };
    }
  }
}
