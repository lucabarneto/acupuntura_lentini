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

export type AdaptableField =
  | { type: "text"; value: string; group?: string[] }
  | { type: "file"; value: string | File };

export interface AdaptableForm {
  [key: string]: AdaptableField;
}
