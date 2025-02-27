import { IconName } from "./icon.types";

export interface ImageListItem {
  link: string;
  type: "image";
  image: string;
  alt: string;
  title: string;
  overline?: string;
  text?: string;
  divider?: true;
}

export interface IconListItem {
  link: string;
  type: "icon";
  icon: IconName;
  trailing_icon?: IconName;
  title: string;
  overline?: string;
  text?: string;
  divider?: true;
}

export interface DefaultListitem {
  link: string;
  type: "default";
  title: string;
  overline?: string;
  text?: string;
  divider?: true;
}
