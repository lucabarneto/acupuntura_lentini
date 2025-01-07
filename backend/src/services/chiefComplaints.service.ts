import {IChiefComplaint} from "../types/mongo/IChiefComplaint.ts";
import { chiefComplaintDAO } from "../database/chiefComplaints.dao.ts";
import { BaseService } from "./base.service.ts";
import { ID } from "../types/general/ID.interface.ts";

class ChiefComplaintService extends BaseService<
  IChiefComplaint,
  typeof chiefComplaintDAO
> {
  addSessionToChiefComplaint = async (
    ids: { chief_complaint_id: ID; session_id: ID },
    chief_complaint: IChiefComplaint
  ): Promise<void> => {
    chief_complaint.patient_evolution.push({
      session: ids.session_id,
    });
    const result = await chiefComplaintDAO.update(
      ids.chief_complaint_id,
      chief_complaint
    );
    if (result.status === "error") throw result.error;
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
