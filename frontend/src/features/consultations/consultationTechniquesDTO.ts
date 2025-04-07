import { AnyStringArrayObject } from "../../types/general.types";
import { IConsultationTechniquesDTO } from "./types/consultation.types";

export class ConsultationTechniquesDTO {
  static adapt(consultationTechniques: AnyStringArrayObject): IConsultationTechniquesDTO[] {
    const entries = Object.entries(consultationTechniques);

    const dto = entries.map((entry) => {
      return {
        resource: entry[0],
        selected_values: entry[1],
      };
    });

    return dto;
  }
}
