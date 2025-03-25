import { IconName } from "../../Icon/icon.types";

export type TextCardType = {
  title: string;
  text: string;

  buttonIcon?: IconName;
  buttonLabel: string;

  clickEvent(e?: React.MouseEvent): void;
};
