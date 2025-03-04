export interface Field {
  group?: string[];
  value: string;
  regex?: RegExp;
  required?: true;
  errorMessage?: {
    regex?: string;
    required?: string;
  };
}

export interface FormFields {
  [key: string]: Field;
}

export interface FormErrors {
  [key: string]: string;
}

export type AdaptableField = string;

export interface NestedAdaptableField {
  value: string;
  group: string[];
}

export interface AdaptableForm {
  [key: string]: AdaptableField | NestedAdaptableField;
}
