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

export interface SubmittableForm {
  [key: string]: string;
}
