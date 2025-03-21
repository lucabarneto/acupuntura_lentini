import { IconName } from "../Icon/icon.types";
import { AppNavigateState } from "../../../hooks/useAppNavigate";

export interface ImageListItemType {
  variant: "image";
  image: string;
  alt: string;
  link: string;
  state: AppNavigateState;
  title: string;
  overline?: string;
  text?: string;
  divider?: true;
}

export interface IconListItemType {
  variant: "icon";
  icon: IconName;
  link: string;
  state: AppNavigateState;
  title: string;
  overline?: string;
  text?: string;
  divider?: true;
}

export interface ListitemType {
  variant: "default";
  link: string;
  state: AppNavigateState;
  title: string;
  overline?: string;
  text?: string;
  divider?: true;
}
