import { AppNavigateState } from "../../../hooks/useAppNavigate";

export interface SegmentedButtonType {
  id: string;
  label: string;
  position: "left" | "middle" | "right";
  link: string;
  state?: AppNavigateState;
  ariaDescription: string;
}
