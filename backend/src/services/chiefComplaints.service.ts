import { IChiefComplaint } from "../types/mongo/IChiefComplaint.ts";
import { chiefComplaintDAO } from "../database/chiefComplaints.dao.ts";
import { BaseService } from "./base.service.ts";

class ChiefComplaintService extends BaseService<
  IChiefComplaint
> {
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
