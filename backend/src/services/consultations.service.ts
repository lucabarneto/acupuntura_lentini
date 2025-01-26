import { IConsultation } from "../types/mongo/IConsultation.ts";
import { consultationDAO } from "../database/consultations.dao.ts";
import { BaseService } from "./base.service.ts";

class ConsultationService extends BaseService<IConsultation> {
  findEqual = (data: IConsultation, consultations: IConsultation[]): boolean =>
    consultations.some(
      (consultation) =>
        consultation.date === data.date &&
        consultation.chief_complaint.toString() ===
          data.chief_complaint.toString()
    );
}

export const consultationService = new ConsultationService(consultationDAO);
