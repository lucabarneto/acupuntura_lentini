export interface InputType<HTMLInput>
  extends FormInputTypes<HTMLInput>,
    UIInputTypes {}

interface UIInputTypes {
  id: string;
  label: string;
  required?: true;
  title?: string;
  placeholder?: string;
  disabled?: true;
}

interface FormInputTypes<HTMLInput> {
  form?: string;
  value?: string;
  defaultValue?: string;
  error?: string;
  group?: string;

  changeEvent?(e: React.ChangeEvent<HTMLInput>): void;
  blurEvent?(e: React.ChangeEvent<HTMLInput>): void;
}
export interface TextInputType extends InputType<HTMLInputElement> {
  type: TextInputTypes;
  regex?: string;
}

type TextInputTypes = "text" | "tel" | "email" | "date" | "password";

export interface SelectInputType extends InputType<HTMLSelectElement> {
  options: SelectOptions[];
  multiple?: true;
}

export interface SelectOptions {
  value: string;
  label: string;
  extra?: unknown;
}

export interface RadioInputType extends InputType<HTMLInputElement> {
  name: string;
  checked?: true;
  clickEvent?(e?: React.MouseEvent): void;
}

export interface CheckboxInputType extends InputType<HTMLInputElement> {
  name: string;
  checked?: true;
}

export type TextAreaType = InputType<HTMLTextAreaElement>;
