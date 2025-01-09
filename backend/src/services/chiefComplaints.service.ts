import { IChiefComplaint } from "../types/mongo/IChiefComplaint.ts";
import { ISession } from "../types/mongo/ISession.ts";
import { chiefComplaintDAO } from "../database/chiefComplaints.dao.ts";
import { BaseService } from "./base.service.ts";
import { sessionService } from "./sessions.service.ts";
import { ID } from "../types/general/ID.interface.ts";

class ChiefComplaintService extends BaseService<
  IChiefComplaint,
  typeof chiefComplaintDAO
> {
  addNewSession = async (data: ISession, chiefComplaint: IChiefComplaint) => {
    const newSession = await sessionService.create(data);

    chiefComplaint.patient_evolution.push({ session: newSession._id! });

    const result = await chiefComplaintDAO.update(
      chiefComplaint._id!,
      chiefComplaint
    );

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  addSessionToChiefComplaint = async (
    session_id: ID,
    chief_complaint: IChiefComplaint
  ): Promise<void> => {
    chief_complaint.patient_evolution.push({
      session: session_id,
    });
    const result = await chiefComplaintDAO.update(
      chief_complaint._id!,
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
