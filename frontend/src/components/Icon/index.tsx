import "./Icon.css";
import { IconName } from "../../types/icon.types";

type Props = {
  icon: IconName;
  filled?: true;
};
export const Icon = ({ icon, filled }: Props) => {
  let className = "icon material-symbols-outlined";
  if (filled) className += " filled";

  return <span className={className}>{icon}</span>;
};
