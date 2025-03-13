import { useState } from "react";
import { FieldValidator } from "../utils/fieldValidator";
import { FormErrors } from "../types/form.types";

/*
This custom hook can operate in forms which have nested fields of up to 1 level of depth. If your form contains fields even more deeply nested, consider dividing it into smaller, more manageable chunks.
*/

interface UseFormStates<T extends { [key: string]: unknown }> {
  fields: T;
  errors: FormErrors;
  isSubmittable: boolean;
}

interface UseFormMethods {
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
  handleBlur(e: React.ChangeEvent<HTMLInputElement>): void;
  handleSubmit(e: React.FormEvent): void;
  handleReset(): void;
}

export type UseForm<T extends { [key: string]: unknown }> = {
  form: UseFormStates<T>;
  formMethods: UseFormMethods;
};

export const useForm = <T extends { [key: string]: unknown }>(
  initialFields: T
): UseForm<T> => {
  const [fields, setFields] = useState<T>(initialFields);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmittable, setIsSubmittable] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof fields[e.target.name] === "string") {
      setFields((prevFields) => {
        return { ...prevFields, [e.target.name]: e.target.value };
      });
    } else {
      setNestedFields(e.target);
    }
  };

  const setNestedFields = (target: EventTarget & HTMLInputElement) => {
    const group = target.dataset.group;
    console.log(group);

    if (group === undefined)
      throw new Error(
        "All nested fields must have a corresponding data-group attribute"
      );

    const nestedFields = fields[group] as T;

    for (const key in nestedFields) {
      if (key === target.name)
        setFields((prevFields) => {
          return {
            ...prevFields,
            [group]: {
              ...nestedFields,
              [key]: target.value,
            },
          };
        });
    }
  };

  /* field validation occurs on blur event */
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);

    const validator = new FieldValidator(e.target);

    if (validator.error === "") {
      delete errors[e.target.name];
      setErrors({ ...errors });
    } else {
      setErrors({ ...errors, [e.target.name]: validator.error });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(errors).length === 0) {
      setIsSubmittable(true);
    } else {
      setIsSubmittable(false);
    }
  };

  const handleReset = () => setFields(initialFields);

  return {
    form: { fields, errors, isSubmittable },
    formMethods: { handleChange, handleBlur, handleSubmit, handleReset },
  };
};
