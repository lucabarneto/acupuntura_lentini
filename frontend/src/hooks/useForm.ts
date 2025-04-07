/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { FieldValidator } from "../utils/fieldValidator";
import { AnyObject, AnyStringObject } from "../types/general.types";

/*
This custom hook can operate in forms which have nested fields of up to 2 levels of depth. If your form contains fields even more deeply nested, consider dividing it into smaller, more manageable chunks.
*/

type FieldElements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

type FormData<T extends AnyObject> = {
  fields: T;
  errors: AnyStringObject;
  isSubmittable: boolean;
};

type FormMethods = {
  handleChange(e: React.ChangeEvent<FieldElements>, depth?: 0 | 1 | 2): void;
  handleBlur(e: React.ChangeEvent<FieldElements>): void;
  handleSubmit(e: React.FormEvent): void;
  handleReset(): void;
};

export type UseForm<T extends AnyObject> = {
  formData: FormData<T>;
  formMethods: FormMethods;
};

function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}

export const useForm = <T extends AnyObject>(initialFields: T): UseForm<T> => {
  const [form, setForm] = useState({
    fields: initialFields,
    errors: {},
    isSubmittable: false,
  });

  useEffect(() => {
    console.log("Fields: ", form.fields);
  }, [form]);

  const handleChange = (
    e: React.ChangeEvent<FieldElements>,
    depth: 0 | 1 | 2 = 0
  ) => {
    const checkedValues = getCheckedValues(e.target);
    const group = e.target.dataset.group;
    const subgroup = e.target.dataset.subgroup;
    const groupErrorMessage =
      "Nested fields must have their cosrresponding data-group (and data-subgroup) attributes";

    switch (depth) {
      case 0:
        setDepthZeroFields(e, checkedValues);
        break;
      case 1:
        assert(group, groupErrorMessage);
        setDepthOneFields(e, checkedValues);
        break;
      case 2:
        assert(group, groupErrorMessage);
        assert(subgroup, groupErrorMessage);
        setDepthTwoFields(e, checkedValues);
        break;
      default: {
        const _exhaustiveCheck: never = depth;
        return _exhaustiveCheck;
      }
    }
  };

  const setDepthZeroFields = (
    e: React.ChangeEvent<FieldElements>,
    checkedValues: null | string[]
  ) =>
    setForm((prev) => {
      return {
        ...prev,
        fields: {
          ...prev.fields,
          [e.target.name]: selectFieldValue(e, checkedValues),
        },
      };
    });

  const setDepthOneFields = (
    e: React.ChangeEvent<FieldElements>,
    checkedValues: null | string[]
  ) => {
    const group = e.target.dataset.group as string;
    const nestedFields = form.fields[group] as T;

    for (const key in nestedFields) {
      if (key === e.target.name)
        setForm((prev) => {
          return {
            ...prev,
            fields: {
              ...prev.fields,
              [group]: {
                ...nestedFields,
                [key]: selectFieldValue(e, checkedValues),
              },
            },
          };
        });
    }
  };

  const setDepthTwoFields = (
    e: React.ChangeEvent<FieldElements>,
    checkedValues: null | string[]
  ) => {
    const group = e.target.dataset.group as string;
    const subgroup = e.target.dataset.subgroup as string;
    const nestedFields = form.fields[group] as T;
    const deeplyNestedFields = nestedFields[subgroup] as T;

    for (const key in deeplyNestedFields) {
      if (key === e.target.name)
        setForm((prev) => {
          return {
            ...prev,
            fields: {
              ...prev.fields,
              [group]: {
                ...nestedFields,
                [subgroup]: {
                  ...deeplyNestedFields,
                  [key]: selectFieldValue(e, checkedValues),
                },
              },
            },
          };
        });
    }
  };

  const selectFieldValue = (
    e: React.ChangeEvent<FieldElements>,
    checkedValues: null | string[]
  ) =>
    checkedValues !== null
      ? checkedValues
      : isFileInput(e.target)
      ? (e.target as HTMLInputElement).files![0]
      : e.target.value;

  const getCheckedValues = (target: FieldElements): string[] | null => {
    if (!isInput(target) || !isCheckInput(target)) return null;

    const checkedInputs = document.querySelectorAll<HTMLInputElement>(
      `input[name="${target.name}"]:checked`
    );
    const selectedValues = Array.from(checkedInputs).map(
      (field) => field.value
    );
    return selectedValues;
  };

  const isCheckInput = (field: FieldElements): boolean =>
    (isInput(field) && field.type === "radio") || field.type === "checkbox";

  const isFileInput = (field: FieldElements): boolean =>
    isInput(field) && field.type === "file";

  const isInput = (
    input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ): input is HTMLInputElement => {
    return (input as HTMLInputElement).type !== undefined;
  };

  /* field validation occurs on blur event */
  const handleBlur = (e: React.ChangeEvent<FieldElements>): void => {
    handleChange(e);

    const validator = new FieldValidator(e.target);
    setForm((prev) => {
      return {
        ...prev,
        errors: {
          ...prev.errors,
          [e.target.name]: validator.error,
        },
      };
    });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (Object.values(form.errors).length === 0) {
      setForm((prev) => {
        return {
          ...prev,
          isSubmittable: true,
        };
      });
    } else {
      setForm((prev) => {
        return {
          ...prev,
          isSubmittable: false,
        };
      });
    }
  };

  const handleReset = (): void =>
    setForm((prev) => {
      return { ...prev, fields: initialFields };
    });

  return {
    formData: form,
    formMethods: {
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset,
    },
  };
};
