interface IFieldValidator {
  field: HTMLInputElement;
  error: string;
  init: () => void;
}

interface FieldValidatorMethods {
  validateRequired: (
    field: HTMLInputElement,
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

export class FieldValidator implements IFieldValidator, FieldValidatorMethods {
  field: HTMLInputElement;
  customErrors: CustomFieldErrors | undefined;
  error: string;

  constructor(
    field: HTMLInputElement,
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
    if (this.field.pattern && this.error === "")
      this.validateRegex(this.field, this.customErrors?.regex);
  };

  validateRequired = (
    field: HTMLInputElement,
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
