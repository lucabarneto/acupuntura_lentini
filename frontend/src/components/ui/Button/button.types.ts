import { IconName } from "../Icon/icon.types";

export interface ButtonType {
  type: "button";
  label: string;
  ref?: React.RefObject<null | HTMLButtonElement>;
  variant: ButtonVariants;

  icon?: IconName;
  disabled?: true;

  ariaProps?: object;

  clickEvent?(e?: React.MouseEvent): void;
}

export interface SubmitButtonType {
  type: "submit";
  form?: string;

  label: string;
  ref?: React.RefObject<null | HTMLButtonElement>;
  variant: ButtonVariants;

  icon?: IconName;
  disabled?: true;

  ariaProps?: object;

  clickEvent?(e?: React.MouseEvent): void;
}

type ButtonVariants = "filled" | "outlined" | "text";
