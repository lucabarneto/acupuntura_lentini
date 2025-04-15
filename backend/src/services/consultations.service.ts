import { IConsultation } from "../types/mongo/IConsultation.js";
import { consultationDAO } from "../database/consultations.dao.js";
import { BaseService } from "./base.service.js";

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
