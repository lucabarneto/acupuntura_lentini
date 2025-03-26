import { IconName } from "../../Icon/icon.types";

export type TextCardType = {
  title: string;
  text: string;
  icon?: IconName;

  buttonIcon?: IconName;
  buttonLabel?: string;

  clickEvent?(e?: React.MouseEvent): void;
};
