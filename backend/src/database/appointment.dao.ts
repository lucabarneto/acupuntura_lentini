import { AppointmentModel } from "../models/appoinment.model.ts";
import IAppointment from "../interfaces/IAppointment.interface.ts";
import { DAO, DAOReturnValue } from "../interfaces/Dao.interface.ts";
import { UpdateQuery } from "mongoose";
import ID from "../interfaces/ID.interface.ts";

export default class AppointmentDAO implements DAO<IAppointment> {
  async getAll(): Promise<DAOReturnValue<IAppointment[]>> {
    try {
      const result = (await AppointmentModel.find()) as IAppointment[];
      return { status: "success", payload: result };
    } catch (error) {
      return { status: "error", error };
    }
  }
  async getById(id: ID): Promise<DAOReturnValue<IAppointment>> {
    try {
      const result = (await AppointmentModel.findById(id)) as IAppointment;
      return { status: "success", payload: result };
    } catch (error) {
      return { status: "error", error };
    }
  }
  async create(data: IAppointment): Promise<DAOReturnValue<IAppointment>> {
    try {
      const result = (await AppointmentModel.create(data)) as IAppointment;

      return { status: "success", payload: result };
    } catch (error) {
      return { status: "error", error };
    }
  }
  async update(
    id: ID,
    update: UpdateQuery<IAppointment>
  ): Promise<DAOReturnValue<IAppointment>> {
    try {
      const result = (await AppointmentModel.findOneAndReplace(
        { _id: id },
        update,
        { returnDocument: "after" }
      )) as IAppointment;

      if (result === null)
        throw new Error(`No Appointment found with ID ${id}`);

      return { status: "success", payload: result };
    } catch (error) {
      return { status: "error", error };
    }
  }
  async delete(id: ID): Promise<DAOReturnValue<{}>> {
    try {
      const result = await AppointmentModel.deleteOne({ _id: id });

      if (result.deletedCount === 0)
        throw new Error("Appointment was not deleted");

      return { status: "success", payload: {} };
    } catch (error) {
      return { status: "error", error };
    }
  }
}
