import {
  AdaptableField,
  AdaptableForm,
  TextAdaptableField,
} from "../../../types/form.types";
import { IPatientNoId, IPatientTemplate } from "../types/patient.types";

const KEY_POSITION = 0;
const FIELD_POSITION = 1;

export class PatientDTO {
  static adapt(form: AdaptableForm): IPatientNoId {
    const entries = Object.entries(form);
    let patient: IPatientTemplate = {};

    patient = this.setBirthAndPresumptiveAnalysisFields(patient, entries);
    patient = this.addFieldsToPatient(patient, entries);

    return patient as IPatientNoId;
  }

  private static setBirthAndPresumptiveAnalysisFields(
    patient: IPatientTemplate,
    entries: [string, AdaptableField][]
  ): IPatientTemplate {
    if (this.hasBirthFields(entries)) patient.birth = {};
    if (this.hasPresumptiveAnalysisFields(entries))
      patient.presumptive_analysis = {};

    return patient;
  }

  private static hasBirthFields(entries: [string, AdaptableField][]): boolean {
    return entries.some(
      (entry) =>
        entry[FIELD_POSITION].type === "text" &&
        entry[FIELD_POSITION].value !== "" &&
        entry[FIELD_POSITION].group &&
        entry[FIELD_POSITION].group[0] === "birth"
    );
  }

  private static hasPresumptiveAnalysisFields(
    entries: [string, AdaptableField][]
  ): boolean {
    return entries.some(
      (entry) =>
        entry[FIELD_POSITION].type === "text" &&
        entry[FIELD_POSITION].value !== "" &&
        entry[FIELD_POSITION].group &&
        entry[FIELD_POSITION].group[0] === "presumptive_analysis"
    );
  }

  private static addFieldsToPatient(
    patient: IPatientTemplate,
    entries: [string, AdaptableField][]
  ): IPatientTemplate {
    for (let i = 0; i < entries.length; i++) {
      const key = entries[i][KEY_POSITION];
      const field = entries[i][FIELD_POSITION];

      if (field.type === "text" && field.value === "") continue;

      if (field.type === "text") this.addTextFields(patient, { key, field });
      if (field.type === "file") patient[key] = field.value;
    }

    return patient;
  }

  private static addTextFields(
    patient: IPatientTemplate,
    entry: { key: string; field: TextAdaptableField }
  ): IPatientTemplate {
    const { key, field } = entry;

    if (field.group) {
      if (field.group[0] === "birth") patient.birth![key] = field.value;
      if (field.group[0] === "presumptive_analysis")
        patient.presumptive_analysis![key] = field.value;
    } else {
      patient[key] = field.value;
    }

    return patient;
  }
}
