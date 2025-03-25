import { IconName } from "../Icon/icon.types";
import { AppNavigateState } from "../../../hooks/useAppNavigate";

interface ListItemType {
  link: string;
  state: AppNavigateState;
  title: string;
  overline?: string;
  text?: string;
  divider?: true;
  dataAttributes?: object;
}

export interface ImageListItemType extends ListItemType {
  variant: "image";
  image: string;
  alt: string;
}

export interface IconListItemType extends ListItemType {
  variant: "icon";
  icon: IconName;
}

export interface DefaultListitemType extends ListItemType {
  variant: "default";
}
