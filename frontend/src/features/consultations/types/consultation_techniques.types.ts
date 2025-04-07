import { ResourceRef } from "../../resources/types/resource.types";

export type IConsultationTechniques = ResourceRef & {
  selected_values: string[];
};

export type IConsultationTechniquesDTO = {
  resource: string;
  selected_values: string[];
};
