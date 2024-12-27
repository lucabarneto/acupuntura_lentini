import { UpdateQuery } from "mongoose";
import { SessionModel } from "../models/session.model.ts";
import ISession from "../interfaces/ISession.interface.ts";
import { DAO, DAOReturnValue } from "../interfaces/Dao.interface.ts";

export default class SessionDAO implements DAO<ISession> {
  getAll = async (): Promise<DAOReturnValue<ISession[]>> => {
    try {
      const result = (await SessionModel.find()) as ISession[];
      return { status: "success", payload: result };
    } catch (error) {
      return { status: "error", error };
    }
  };

  getById = async (id: string): Promise<DAOReturnValue<ISession>> => {
    try {
      const result = (await SessionModel.findById(id)) as ISession;

      return { status: "success", payload: result };
    } catch (error) {
      return { status: "error", error };
    }
  };

  create = async (data: ISession): Promise<DAOReturnValue<ISession>> => {
    try {
      const result = (await SessionModel.create(data)) as ISession;

      return { status: "success", payload: result };
    } catch (error) {
      return { status: "error", error };
    }
  };

  update = async (
    id: string,
    update: UpdateQuery<ISession>
  ): Promise<DAOReturnValue<ISession>> => {
    try {
      const result = (await SessionModel.findOneAndReplace(
        { _id: id },
        update,
        {
          returnDocument: "after",
        }
      )) as ISession;

      return { status: "success", payload: result };
    } catch (error) {
      return { status: "error", error };
    }
  };

  delete = async (id: string): Promise<DAOReturnValue<{}>> => {
    try {
      const result = await SessionModel.deleteOne({ _id: id });

      if (result.deletedCount === 0) throw new Error("Patient was not deleted");

      return { status: "success", payload: {} };
    } catch (error) {
      return { status: "error", error };
    }
  };
}
