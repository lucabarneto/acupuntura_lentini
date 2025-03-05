import { useState } from "react";
import { FormFields, FormErrors, AdaptableForm } from "../types/form.types";
import { FieldValidator } from "../utils/fieldValidator";

interface UseFormMethods {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetForm(): void;
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

export const useForm = (initialForm: FormFields): UseForm => {
  const [rawForm, setRawForm] = useState<FormFields>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [adaptableForm, setAdaptableForm] = useState<AdaptableForm | null>(
    null
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

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
      setAdaptableForm(createAdaptableForm(rawForm));
    }
  };

  const resetForm = () => {
    setAdaptableForm({});
    setCanSubmit(false);
  };

  const createAdaptableForm = (formTemplate: FormFields): AdaptableForm => {
    const submittableForm: AdaptableForm = {};

    const entries = Object.entries(formTemplate);

    for (let i = 0; i < entries.length; i++) {
      const key = entries[i][KEY_POSITION];
      const field = entries[i][FIELD_POSITION];
      let value;

      if (field.group) {
        value = { group: field.group, value: field.value };
      } else {
        value = field.value;
      }

      submittableForm[key] = value;
    }

    return submittableForm;
  };

  return {
    rawForm,
    errors,
    canSubmit,
    adaptableForm,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
