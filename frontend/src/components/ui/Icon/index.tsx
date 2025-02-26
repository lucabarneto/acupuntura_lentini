import "./Icon.css";
import { IconName } from "../../../types/icon.types";

type Props = {
  icon: IconName;
  filled?: true;
};
export const Icon = (props: Props) => {
  let className = "icon material-symbols-outlined";
  if (props.filled) className += " filled";

  return <span className={className}>{props.icon}</span>;
};
