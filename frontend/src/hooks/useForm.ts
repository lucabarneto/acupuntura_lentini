import { useState } from "react";
import { FormFields, FormErrors, SubmittableForm } from "../types/form.types";
import { FieldValidator } from "../utils/fieldValidator";

interface UseFormMethods {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

interface UseFormStates<T extends object> {
  errors: FormErrors;
  canSubmit: boolean;
  rawForm: FormFields;
  formToSubmit: T | null;
}

export interface UseForm<T extends object>
  extends UseFormStates<T>,
    UseFormMethods {}

const KEY_POSITION = 0;
const VALUE_POSITION = 1;

export const useForm = <T extends object>(
  initialForm: FormFields
): UseForm<T> => {
  const [rawForm, setRawForm] = useState<FormFields>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [formToSubmit, setFormToSubmit] = useState<T | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log("nombre:", name, "valor", value);

    rawForm[name].value = value;
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

    if (Object.values(errors).length === 0) {
      setCanSubmit(true);
      setFormToSubmit(createSubmittableForm(rawForm));
    }
  };

  const createSubmittableForm = (formTemplate: FormFields): T => {
    const submittableForm: SubmittableForm = {};

    const formEntries = Object.entries(formTemplate);

    for (let i = 0; i < formEntries.length; i++) {
      const key = formEntries[i][KEY_POSITION];
      const value = formEntries[i][VALUE_POSITION].value;

      submittableForm[key] = value;
    }

    return submittableForm as T;
  };

  return {
    rawForm,
    errors,
    canSubmit,
    formToSubmit,
    handleBlur,
    handleChange,
    handleSubmit,
  };
};
