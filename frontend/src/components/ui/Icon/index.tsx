import "./Icon.css";
import { IconType } from "./icon.types";

type Props = IconType;

export const Icon = (props: Props) => {
  const { icon, filled } = props;

  let className = "icon material-symbols-outlined";
  if (filled) className += " filled";

  return <span className={className}>{icon}</span>;
};
