export interface TextField {
  type: "text";
  group?: string[];
  value: string;
  regex?: RegExp;
  required?: true;
  errorMessage?: {
    regex?: string;
    required?: string;
  };
}

export interface FileField {
  type: "file";
  value: File | string;
}

export interface FormFields {
  [key: string]: TextField | FileField;
}

export interface FormErrors {
  [key: string]: string;
}

export interface TextAdaptableField {
  type: "text";
  value: string;
  group?: string[];
}

export interface FileAdaptableField {
  type: "file";
  value: string;
}

export type AdaptableField = TextAdaptableField | FileAdaptableField;

export interface AdaptableForm {
  [key: string]: AdaptableField;
}
