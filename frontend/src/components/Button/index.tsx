import "./Button.css";
import { Icon } from "../Icon";

type Props = {
  label: string;
  type: "filled" | "outlined" | "text";
  disabled?: true;
  icon?: string;
  onclickEvent?(): void;
};

export const Button = ({
  icon,
  label,
  type,
  disabled,
  onclickEvent,
}: Props) => {
  let className = `button ${type}`;
  if (disabled) className += " disabled";
  if (icon) className += " has-icon";

  return (
    <button className={className} onClick={onclickEvent}>
      {icon && <Icon icon={icon} />}
      {label}
    </button>
  );
};
