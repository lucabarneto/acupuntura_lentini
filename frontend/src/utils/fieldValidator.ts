type FieldHTMLElements =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

interface IFieldValidator {
  field: FieldHTMLElements;
  error: string;
  init: () => void;
}

interface FieldValidatorMethods {
  validateRequired: (
    field: FieldHTMLElements,
    customError?: CustomFieldErrors["required"]
  ) => void;
  validateRegex: (
    field: HTMLInputElement,
    customError?: CustomFieldErrors["regex"]
  ) => void;
}

interface CustomFieldErrors {
  required?: string;
  regex?: string;
}

const isHTMLInputElement = (
  input: FieldHTMLElements
): input is HTMLInputElement => {
  return (input as HTMLInputElement).files !== undefined;
};

export class FieldValidator implements IFieldValidator, FieldValidatorMethods {
  field: FieldHTMLElements;
  customErrors: CustomFieldErrors | undefined;
  error: string;

  constructor(
    field: FieldHTMLElements,
    errors: CustomFieldErrors | undefined = undefined
  ) {
    this.field = field;
    this.error = "";
    this.customErrors = errors;
    this.init();
  }

  init = (): void => {
    if (this.field.required)
      this.validateRequired(this.field, this.customErrors?.required);
    if (
      isHTMLInputElement(this.field) &&
      this.field.pattern &&
      this.error === ""
    )
      this.validateRegex(this.field, this.customErrors?.regex);
  };

  validateRequired = (
    field: FieldHTMLElements,
    customError?: CustomFieldErrors["required"]
  ): void => {
    if (field.value === "") this.error = customError || "Campo requerido";
  };

  validateRegex = (
    field: HTMLInputElement,
    customError?: CustomFieldErrors["regex"]
  ): void => {
    const regex = new RegExp(field.pattern);

    if (!regex.test(field.value))
      this.error = customError || "Formato incorrecto";
  };
}
