import mongoose from "mongoose";
import { ID } from "../types/general/ID.interface.ts";
import { DAO, DAOReturnValue } from "../types/general/Dao.interface.ts";
import { SortQueries } from "../types/general/SortQueries.ts";

export abstract class MongoDAO<Interface> implements DAO<Interface> {
  private model: mongoose.Model<Interface>;

  constructor(model: mongoose.Model<Interface>) {
    this.model = model;
  }

  async getAll(
    sort: undefined | SortQueries = undefined
  ): Promise<DAOReturnValue<Interface[]>> {
    try {
      const result = (await this.model.find().sort(sort)) as Interface[];

      return { status: "success", payload: result };
    } catch (error) {
      return { status: "error", error };
    }
  }

  async getById(id: ID): Promise<DAOReturnValue<Interface>> {
    try {
      const result = (await this.model.findById(id)) as Interface;

      if (!result) throw new Error(`Not found (searched ID: ${id})`);

      return { status: "success", payload: result };
    } catch (error) {
      return { status: "error", error };
    }
  }

  async create(data: Interface): Promise<DAOReturnValue<Interface>> {
    try {
      const result = (await this.model.create(data)) as Interface;

      return { status: "success", payload: result };
    } catch (error) {
      return { status: "error", error };
    }
  }

  async update(id: ID, update: Interface): Promise<DAOReturnValue<Interface>> {
    try {
      const result = (await this.model.findOneAndReplace({ _id: id }, update, {
        returnDocument: "after",
      })) as Interface;

      return { status: "success", payload: result };
    } catch (error) {
      return { status: "error", error };
    }
  }

  async delete(id: ID): Promise<DAOReturnValue<{}>> {
    try {
      const result = await this.model.deleteOne({ _id: id });

      if (result.deletedCount === 0) throw new Error("Patient was not deleted");

      return { status: "success", payload: {} };
    } catch (error) {
      return { status: "error", error };
    }
  }
}
