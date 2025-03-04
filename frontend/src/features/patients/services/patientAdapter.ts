/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  AdaptableField,
  AdaptableForm,
  NestedAdaptableField,
} from "../../../types/form.types";
import { IPatient } from "../types/IPatient";

const KEY_POSITION = 0;
const FIELD_POSITION = 1;

interface AnyObject {
  [key: string]: any;
}

export class PatientAdapter {
  adapt(form: AdaptableForm): IPatient {
    const entries = Object.entries(form);
    const patient: AnyObject = {};

    for (let i = 0; i < entries.length; i++) {
      const key = entries[i][KEY_POSITION];
      const field = entries[i][FIELD_POSITION];

      this.addFieldsToPatient(patient, { key, field });
    }

    return patient as IPatient;
  }

  private addFieldsToPatient(
    patient: AnyObject,
    entry: { key: string; field: AdaptableField | NestedAdaptableField }
  ) {
    const { key, field } = entry;

    if (typeof field === "string") {
      patient[key] = field;
    }

    if (typeof field !== "string" && field.group[0] === "group") {
      patient.birth[key] = field.value;
    }

    if (typeof field !== "string" && field.group[0] === "presumptive_analysis")
      patient.presumptive_analysis[key] = field.value;
  }
}
