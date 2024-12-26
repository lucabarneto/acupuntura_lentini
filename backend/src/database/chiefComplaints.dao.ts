import { ChiefComplaintModel } from "../models/chiefComplaint.model.ts";
import IChiefComplaint from "../interfaces/IChiefComplaint.interface.ts";
import { DAO, DAOReturnValue } from "../interfaces/Dao.interface.ts";
import { UpdateQuery } from "mongoose";

export default class ChiefComplaintDAO implements DAO<IChiefComplaint> {
  async getAll(): Promise<DAOReturnValue<IChiefComplaint[]>> {
    try {
      const result = (await ChiefComplaintModel.find()) as IChiefComplaint[];
      return { status: "success", payload: result };
    } catch (error) {
      return { status: "error", error };
    }
  }
  async getById(id: string): Promise<DAOReturnValue<IChiefComplaint>> {
    try {
      const result = (await ChiefComplaintModel.findById(
        id
      )) as IChiefComplaint;
      return { status: "success", payload: result };
    } catch (error) {
      return { status: "error", error };
    }
  }
  async create(
    data: IChiefComplaint
  ): Promise<DAOReturnValue<IChiefComplaint>> {
    try {
      const result = (await ChiefComplaintModel.create(
        data
      )) as IChiefComplaint;
      return { status: "success", payload: result };
    } catch (error) {
      return { status: "error", error };
    }
  }
  async update(
    id: string,
    update: UpdateQuery<IChiefComplaint>
  ): Promise<DAOReturnValue<IChiefComplaint>> {
    try {
      const result = (await ChiefComplaintModel.findOneAndReplace(
        { _id: id },
        update,
        { returnDocument: "after" }
      )) as IChiefComplaint;

      if (result === null)
        throw new Error(`No ChiefComplaint found with ID ${id}`);

      return { status: "success", payload: result };
    } catch (error) {
      return { status: "error", error };
    }
  }
  async delete(id: string): Promise<DAOReturnValue<{}>> {
    try {
      const result = await ChiefComplaintModel.deleteOne({ _id: id });

      if (result.deletedCount === 0)
        throw new Error("ChiefComplaint was not deleted");

      return { status: "success", payload: {} };
    } catch (error) {
      return { status: "error", error };
    }
  }
}
