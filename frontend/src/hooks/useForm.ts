import { useState, useEffect } from "react";
import { FormFields, FormErrors, AdaptableForm } from "../types/form.types";
import { FieldValidator } from "../utils/fieldValidator";

interface UseFormMethods {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetFormData(): void;
}

interface UseFormStates {
  errors: FormErrors;
  canSubmit: boolean;
  rawForm: FormFields;
  adaptableForm: AdaptableForm | null;
}

export interface UseForm extends UseFormStates, UseFormMethods {}

const KEY_POSITION = 0;
const FIELD_POSITION = 1;

export const useForm = (
  initialForm: FormFields,
  submitButton: HTMLButtonElement
): UseForm => {
  const [rawForm, setRawForm] = useState<FormFields>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [adaptableForm, setAdaptableForm] = useState<AdaptableForm | null>(
    null
  );

  useEffect(() => {
    if (submitButton !== null) {
      if (formHasNoErrors() && !isRequiredFieldNotFilled()) {
        submitButton.classList.remove("disabled");
        submitButton.setAttribute(
          "title",
          "Debes completar todos los campos requeridos"
        );
      } else if (isRequiredFieldNotFilled()) {
        submitButton.classList.add("disabled");
        submitButton.setAttribute(
          "title",
          "Haz click para añadir a la persona paciente al sistema"
        );
      }
    }
  }, [rawForm, errors, submitButton]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;

    if (rawForm[target.name].type === "file") {
      console.log("archivos: ", target.files);
      rawForm[target.name].value = target.files ? target.files[0] : "";
    } else {
      rawForm[target.name].value = target.value;
    }

    setRawForm({ ...rawForm });
  };

  /* field validation occurs on blur event */
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);

    const name = e.target.name;
    const validator = new FieldValidator(rawForm[name]);

    if (validator.error === "") {
      delete errors[name];
      setErrors({ ...errors });
    } else {
      setErrors({ ...errors, [name]: validator.error });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formHasNoErrors() && !isRequiredFieldNotFilled()) {
      setAdaptableForm(createAdaptableForm(rawForm));
      setCanSubmit(true);
    }
  };

  const formHasNoErrors = (): boolean => Object.values(errors).length === 0;
  const isRequiredFieldNotFilled = (): boolean =>
    Object.values(rawForm).some(
      (field) => field.type === "text" && field.required && field.value === ""
    );

  const createAdaptableForm = (formTemplate: FormFields): AdaptableForm => {
    const adaptableForm: AdaptableForm = {};

    const entries = Object.entries(formTemplate);

    for (let i = 0; i < entries.length; i++) {
      const key = entries[i][KEY_POSITION];
      const field = entries[i][FIELD_POSITION];
      let value;

      if (field.type === "text") {
        if (field.group) {
          value = { group: field.group, value: field.value, type: field.type };
        } else {
          value = { value: field.value, type: field.type };
        }
        adaptableForm[key] = value;
      } else if (field.type === "file") {
        value = { value: field.value, type: field.type };
        adaptableForm[key] = value;
      }
    }

    console.log("formulario a adaptar: ", adaptableForm);
    return adaptableForm;
  };

  const resetFormData = () => {
    Object.values(rawForm).forEach((field) => (field.value = ""));

    setRawForm({ ...rawForm });
    setErrors({});
    setAdaptableForm({});
    setCanSubmit(false);
  };

  return {
    rawForm,
    errors,
    canSubmit,
    adaptableForm,
    handleBlur,
    handleChange,
    handleSubmit,
    resetFormData,
  };
};
