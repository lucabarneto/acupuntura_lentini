import { Field } from "../types/form.types";

interface IFieldValidator {
  field: Field;
  error: string;
  init: () => void;
}

interface FieldValidatorMethods {
  validateRequired: () => void;
  validateRegex: () => void;
}

export class FieldValidator implements IFieldValidator, FieldValidatorMethods {
  field: Field;
  error: string;

  constructor(field: Field) {
    this.field = field;
    this.error = "";

    this.init();
  }

  init = (): void => {
    if (this.field.required) this.validateRequired();
    if (this.field.value && this.field.regex && !this.error)
      this.validateRegex();
  };

  validateRequired = (): void => {
    if (!this.field.value)
      this.error = this.field.errorMessage?.required || "Campo requerido";
  };

  validateRegex = (): void => {
    const { regex, value } = this.field;

    if (!regex!.test(value))
      this.error = this.field.errorMessage?.regex || "Formato incorrecto";
  };
}
