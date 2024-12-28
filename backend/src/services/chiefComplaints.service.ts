import ChiefComplaintDAO from "../database/chiefComplaints.dao.ts";
import IChiefComplaint from "../interfaces/IChiefComplaint.interface.ts";
import ID from "../interfaces/ID.interface.ts";

const chiefComplaintDAO = new ChiefComplaintDAO();

export default class ChiefComplaint {
  async getAll() {
    const result = await chiefComplaintDAO.getAll();

    if (result.status === "error") throw result.error;

    return result.payload;
  }

  async getById(id: ID) {
    const result = await chiefComplaintDAO.getById(id);

    if (result.status === "error") throw result.error;

    return result.payload;
  }

  async create(data: IChiefComplaint) {
    const result = await chiefComplaintDAO.create(data);

    if (result.status === "error") throw result.error;

    return result.payload;
  }

  async update(id: ID, data: IChiefComplaint) {
    const result = await chiefComplaintDAO.update(id, data);

    if (result.status === "error") throw result.error;

    return result.payload;
  }

  async delete(id: ID) {
    const result = await chiefComplaintDAO.delete(id);

    if (result.status === "error") throw result.error;

    return result.payload;
  }
}
