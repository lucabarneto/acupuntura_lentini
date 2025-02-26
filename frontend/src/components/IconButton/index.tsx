import "./IconButton.css";
import { IconName } from "../../types/icon.types";
import { Icon } from "../Icon";

type Props = {
  icon: IconName;
  type: "filled" | "standard";
  disabled?: true;
  onclickEvent?: (e?: React.MouseEvent) => void;
};

export const IconButton = ({ disabled, type, icon, onclickEvent }: Props) => {
  let className = `icon-button ${type}`;
  if (disabled) className += " disabled";

  return (
    <button className={className} onClick={onclickEvent}>
      <Icon icon={icon} />
    </button>
  );
};
