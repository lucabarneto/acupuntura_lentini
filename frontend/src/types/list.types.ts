import { IconName } from "./icon.types";

export interface ImageListItem {
  type: "image";
  image: string;
  alt: string;
  title: string;
  overline?: string;
  text?: string;
  divider?: true;
}

export interface IconListItem {
  type: "icon";
  icon: IconName;
  trailing_icon?: IconName;
  title: string;
  overline?: string;
  text?: string;
  divider?: true;
}

export interface DefaultListitem {
  type: "default";
  title: string;
  overline?: string;
  text?: string;
  divider?: true;
}
