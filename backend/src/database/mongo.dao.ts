import ID from "../interfaces/ID.interface.ts";
import { DAO, DAOReturnValue } from "../interfaces/DAO.interface.ts";
import mongoose from "mongoose";

export abstract class MongoDAO<
  Interface,
  Model extends mongoose.Model<Interface>
> implements DAO<Interface>
{
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  async getAll(): Promise<DAOReturnValue<Interface[]>> {
    try {
      const result = (await this.model.find()) as Interface[];
      return { status: "success", payload: result };
    } catch (error) {
      return { status: "error", error };
    }
  }

  async getById(id: ID): Promise<DAOReturnValue<Interface>> {
    try {
      const result = (await this.model.findById(id)) as Interface;

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
