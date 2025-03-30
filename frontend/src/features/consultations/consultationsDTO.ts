import {
  IConsultationDTO,
  IConsultationForm,
} from "./types/consultation.types";

export class ConsultationDTO {
  static adapt(consultation: IConsultationForm): IConsultationDTO {
    const resources = consultation.resources.map((resource) => {
      return { resource };
    });

    return { ...consultation, resources };
  }
}
