import "./Button.css";
import { Icon } from "../Icon";

type Props = {
  label: string;
  type: "filled" | "outlined" | "text";
  disabled?: true;
  icon?: string;
};

export const Button = ({ icon, label, type, disabled }: Props) => {
  let className = `button ${type}`;
  if (disabled) className += " disabled";
  if (icon) className += " hasIcon";

  return (
    <button className={className}>
      {icon && <Icon label={icon} />}
      {label}
    </button>
  );
};
