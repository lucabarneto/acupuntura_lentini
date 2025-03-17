import { useState } from "react";
import { FieldValidator } from "../utils/fieldValidator";
import { FormErrors } from "../types/form.types";

/*
This custom hook can operate in forms which have nested fields of up to 2 levels of depth. If your form contains fields even more deeply nested, consider dividing it into smaller, more manageable chunks.
*/

type Target = EventTarget & HTMLInputElement;

type GroupSet = [string, string];

const GROUP = 0;
const SUBGROUP = 1;

interface UseFormStates<T extends { [key: string]: unknown }> {
  fields: T;
  errors: FormErrors;
  isSubmittable: boolean;
}

interface UseFormMethods {
  handleChange(e: React.ChangeEvent<HTMLInputElement>, depth?: 0 | 1 | 2): void;
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    depth: 0 | 1 | 2 = 0
  ): void => {
    const { name, value, files } = e.target;

    if (depth === 0) {
      setFields((prevFields) => {
        return {
          ...prevFields,
          [name]: name === "profile_picture" ? files![0] : value,
        };
      });
    } else {
      manageNestedFields(e.target, depth);
    }
  };

  const manageNestedFields = (target: Target, depth: 1 | 2 = 1): void => {
    const group = target.dataset.group;
    const subgroup = target.dataset.subgroup;

    const error =
      "All nested fields must have a corresponding data-group (and data-subgroup if depth = 2) attribute";
    if (group === undefined) throw new Error(error);
    if (depth === 2 && subgroup === undefined) throw new Error(error);

    if (depth === 1) {
      setNestedFieldsDepthOne(target, group);
    } else {
      setNestedFieldsDepthTwo(target, [group, subgroup!]);
    }
  };

  const setNestedFieldsDepthOne = (target: Target, group: string): void => {
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

  const setNestedFieldsDepthTwo = (
    target: Target,
    groupSet: GroupSet
  ): void => {
    const nestedFields = fields[groupSet[GROUP]] as T;
    const deeplyNestedFields = nestedFields[groupSet[SUBGROUP]] as T;

    for (const key in deeplyNestedFields) {
      if (key === target.name)
        setFields((prevFields) => {
          return {
            ...prevFields,
            [groupSet[GROUP]]: {
              ...nestedFields,
              [groupSet[SUBGROUP]]: {
                ...deeplyNestedFields,
                [key]: target.value,
              },
            },
          };
        });
    }
  };

  /* field validation occurs on blur event */
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>): void => {
    handleChange(e);

    const validator = new FieldValidator(e.target);

    if (validator.error === "") {
      delete errors[e.target.name];
      setErrors({ ...errors });
    } else {
      setErrors({ ...errors, [e.target.name]: validator.error });
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (Object.values(errors).length === 0) {
      setIsSubmittable(true);
    } else {
      setIsSubmittable(false);
    }
  };

  const handleReset = (): void => setFields(initialFields);

  return {
    form: { fields, errors, isSubmittable },
    formMethods: { handleChange, handleBlur, handleSubmit, handleReset },
  };
};
