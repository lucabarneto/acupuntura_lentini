import { IconName } from "./icon.types";
import { LinkState } from "./link.types";

export interface ImageListItem {
  link: string;
  state?: LinkState;
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
  state?: LinkState;
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
  state?: LinkState;
  type: "default";
  title: string;
  overline?: string;
  text?: string;
  divider?: true;
}
