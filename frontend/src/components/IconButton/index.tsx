import "./IconButton.css";
import { IconName } from "../../types/icon.types";
import { Icon } from "../Icon";

type Props = {
  icon: IconName;
  type: "filled" | "standard";
  disabled?: true;
  submit?: true;
};

export const IconButton = ({ disabled, type, icon, submit }: Props) => {
  let className = `icon-button ${type}`;
  if (disabled) className += " disabled";

  return submit ? (
    <button className={className} type="submit">
      <Icon icon={icon} />
    </button>
  ) : (
    <button className={className}>
      <Icon icon={icon} />
    </button>
  );
};
