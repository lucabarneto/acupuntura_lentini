import { IconName } from "../Icon/icon.types";
import { LinkState } from "../../../types/link.types";

export interface ImageListItemType {
  variant: "image";
  image: string;
  alt: string;
  link: string;
  state?: LinkState;
  title: string;
  overline?: string;
  text?: string;
  divider?: true;
}

export interface IconListItemType {
  variant: "icon";
  icon: IconName;
  link: string;
  state?: LinkState;
  title: string;
  overline?: string;
  text?: string;
  divider?: true;
}

export interface ListitemType {
  variant: "default";
  link: string;
  state?: LinkState;
  title: string;
  overline?: string;
  text?: string;
  divider?: true;
}
