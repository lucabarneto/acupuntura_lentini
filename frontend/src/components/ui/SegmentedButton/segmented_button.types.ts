import { LinkState } from "../../../types/link.types";

export interface SegmentedButtonType {
  id: string;
  label: string;
  position: "left" | "middle" | "right";
  link: string;
  state?: LinkState;
  ariaDescription: string;
}
