import { IconName } from "../Icon/icon.types";

export interface IconButtonType {
  icon: IconName;
  ariaLabel: string;

  disabled?: true;

  clickEvent(e?: React.MouseEvent): void;
}
