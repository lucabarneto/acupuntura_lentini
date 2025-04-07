import { UseForm } from "../hooks/useForm";

export type AnyObject = { [key: string]: NonNullable<unknown> };

export type AnyStringObject = { [key: string]: string };

export type AnyStringArrayObject = {[key: string]: string[]}

export type FormProps<T extends AnyObject> = {
  formId: string;
  form: UseForm<T>;
};
