export interface InputType<HTMLInput> {
  id: string;
  label: string;
  required?: true;
  title?: string;
  placeholder?: string;

  form?: string;
  value: string;
  error?: string;
  group?: string;

  changeEvent?(e: React.ChangeEvent<HTMLInput>): void;
  blurEvent?(e: React.ChangeEvent<HTMLInput>): void;
}

export interface TextInputType extends InputType<HTMLInputElement> {
  type: TextInputTypes;
  regex?: string;
}

type TextInputTypes = "text" | "tel" | "email" | "date";

export interface SelectInputType extends InputType<HTMLSelectElement> {
  options: SelectOptions[];
}

interface SelectOptions {
  value: string;
  label: string;
}

export interface RadioInputType extends InputType<HTMLInputElement> {
  name: string;
  checked?: true;
  clickEvent?(e?: React.MouseEvent): void;
}

export type TextAreaType = InputType<HTMLTextAreaElement>;
