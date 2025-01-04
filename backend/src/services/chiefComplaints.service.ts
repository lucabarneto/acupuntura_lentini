import { chiefComplaintDAO } from "../database/chiefComplaints.dao.ts";
import IChiefComplaint from "../interfaces/IChiefComplaint.interface.ts";
import ID from "../interfaces/ID.interface.ts";

export default class ChiefComplaint {
  getAll = async () => {
    const result = await chiefComplaintDAO.getAll();

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  getById = async (id: ID) => {
    const result = await chiefComplaintDAO.getById(id);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  create = async (data: IChiefComplaint) => {
    const result = await chiefComplaintDAO.create(data);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  update = async (id: ID, data: IChiefComplaint) => {
    const result = await chiefComplaintDAO.update(id, data);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  delete = async (id: ID) => {
    const result = await chiefComplaintDAO.delete(id);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  getByIdAndAddSession = async (chief_complaint_id: ID, session_Id: ID) => {
    try {
      const chiefComplaint = await chiefComplaintDAO.getById(
        chief_complaint_id
      );

      if (chiefComplaint.status === "error") throw chiefComplaint.error;

      const result = await this.addSession(
        { chief_complaint_id, session_Id },
        chiefComplaint.payload
      );

      return result;
    } catch (err) {
      throw err;
    }
  };

  private addSession = async (
    ids: { chief_complaint_id: ID; session_Id: ID },
    chief_complaint: IChiefComplaint
  ) => {
    chief_complaint.patient_evolution.push({
      session: ids.session_Id,
    });

    const result = await chiefComplaintDAO.update(
      ids.chief_complaint_id,
      chief_complaint
    );

    if (result.status === "error") throw result.error;

    return result.payload;
  };
}
