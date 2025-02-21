import "./Button.css";
import { IconName } from "../../types/icon.types";
import { Icon } from "../Icon";

type Props = {
  label: string;
  type: "filled" | "outlined" | "text";
  icon?: IconName;
  disabled?: true;
  aria: object;

  onclickEvent?(): void;
};

export const Button = ({
  icon,
  label,
  type,
  disabled,
  aria,
  onclickEvent,
}: Props) => {
  let className = `button ${type}`;
  if (disabled) className += " disabled";
  if (icon) className += " has-icon";

  return (
    <button className={className} {...aria} onClick={onclickEvent}>
      {icon && <Icon icon={icon} />}
      {label}
    </button>
  );
};
