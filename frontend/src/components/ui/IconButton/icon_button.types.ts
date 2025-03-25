import { IconName } from "../Icon/icon.types";

export interface IconButtonType {
  icon: IconName;
  ariaLabel: string;
  ref?: React.RefObject<null | HTMLButtonElement>;

  disabled?: true;

  clickEvent(e?: React.MouseEvent): void;
}
