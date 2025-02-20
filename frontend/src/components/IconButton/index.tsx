import "./IconButton.css";
import { Icon } from "../Icon";

type Props = {
  icon: string;
  type: "filled" | "standard";
  disabled?: true;
};

export const IconButton = ({ disabled, type, icon }: Props) => {
  let className = `icon-button ${type}`;
  if (disabled) className += " disabled";

  return (
    <button className={className}>
      <Icon icon={icon} />
    </button>
  );
};
