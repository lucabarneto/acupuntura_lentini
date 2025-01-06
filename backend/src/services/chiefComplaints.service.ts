import { chiefComplaintDAO } from "../database/chiefComplaints.dao.ts";
import IChiefComplaint from "../interfaces/IChiefComplaint.interface.ts";
import ID from "../interfaces/ID.interface.ts";
import { BaseService } from "./base.service.ts";

class ChiefComplaintService extends BaseService<
  IChiefComplaint,
  typeof chiefComplaintDAO
> {
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

  findEqual = (
    data: IChiefComplaint,
    chiefComplaints: IChiefComplaint[]
  ): boolean =>
    chiefComplaints.some(
      (chiefComplaint) =>
        chiefComplaint.state !== "finished" &&
        chiefComplaint.title.toLowerCase() === data.title.toLowerCase() &&
        chiefComplaint.patient.toString() === data.patient.toString()
    );
}

export const chiefComplaintService = new ChiefComplaintService(
  chiefComplaintDAO
);
