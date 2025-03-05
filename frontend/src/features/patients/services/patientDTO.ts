/* eslint-disable @typescript-eslint/no-explicit-any */

import { AdaptableForm } from "../../../types/form.types";
import { IPatientNoId } from "../types/IPatient";

const KEY_POSITION = 0;
const FIELD_POSITION = 1;

interface IPatientTemplate {
  [key: string]: any;
  birth: {
    [key: string]: any;
  };
  presumptive_analysis: {
    [key: string]: any;
  };
}

export class PatientDTO {
  static adapt(form: AdaptableForm): IPatientNoId {
    const entries = Object.entries(form);
    const patient: IPatientTemplate = { birth: {}, presumptive_analysis: {} };

    for (let i = 0; i < entries.length; i++) {
      const key = entries[i][KEY_POSITION];
      const field = entries[i][FIELD_POSITION];

      if (typeof field === "string" && field === "") continue;
      if (typeof field !== "string" && field.value === "") continue;

      if (typeof field === "string") {
        patient[key] = field;
      }

      if (typeof field !== "string" && field.group[0] === "birth") {
        patient.birth[key] = field.value;
      }

      if (
        typeof field !== "string" &&
        field.group[0] === "presumptive_analysis"
      ) {
        patient.presumptive_analysis[key] = field.value;
      }
    }

    console.log(patient);

    return patient as IPatientNoId;
  }
}
