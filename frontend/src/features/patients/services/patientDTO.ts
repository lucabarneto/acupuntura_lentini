/* eslint-disable @typescript-eslint/no-explicit-any */

import { AdaptableForm } from "../../../types/form.types";
import { IPatientNoId } from "../types/IPatient";

const KEY_POSITION = 0;
const FIELD_POSITION = 1;

interface IPatientTemplate {
  [key: string]: any;
  birth?: {
    [key: string]: any;
  };
  presumptive_analysis?: {
    [key: string]: any;
  };
}

export class PatientDTO {
  static adapt(form: AdaptableForm): IPatientNoId {
    const entries = Object.entries(form);
    const patient: IPatientTemplate = {};

    const hasBirthFields = entries.some(
      (entry) =>
        entry[FIELD_POSITION].type === "text" &&
        entry[FIELD_POSITION].value !== "" &&
        entry[FIELD_POSITION].group &&
        entry[FIELD_POSITION].group[0] === "birth"
    );

    const hasPresumptiveAnalysisFields = entries.some(
      (entry) =>
        entry[FIELD_POSITION].type === "text" &&
        entry[FIELD_POSITION].value !== "" &&
        entry[FIELD_POSITION].group &&
        entry[FIELD_POSITION].group[0] === "birth"
    );

    if (hasBirthFields) patient.birth = {};
    if (hasPresumptiveAnalysisFields) patient.presumptive_analysis = {};

    for (let i = 0; i < entries.length; i++) {
      const key = entries[i][KEY_POSITION];
      const field = entries[i][FIELD_POSITION];

      if (field.type === "text" && field.value === "") continue;

      if (field.type === "text") {
        if (field.group) {
          if (field.group[0] === "birth") patient.birth![key] = field.value;
          if (field.group[0] === "presumptive_analysis")
            patient.presumptive_analysis![key] = field.value;
        } else {
          patient[key] = field.value;
        }
      } else {
        console.log("foto de perfil: ", field.value);
        patient[key] = field.value;
      }
    }

    console.log("paciente final: ", patient);
    return patient as IPatientNoId;
  }
}
