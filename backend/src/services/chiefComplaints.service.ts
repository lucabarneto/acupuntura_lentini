import { IChiefComplaint } from "../types/mongo/IChiefComplaint";
import { chiefComplaintDAO } from "../database/chiefComplaints.dao";
import { BaseService } from "./base.service";

class ChiefComplaintService extends BaseService<IChiefComplaint> {
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
