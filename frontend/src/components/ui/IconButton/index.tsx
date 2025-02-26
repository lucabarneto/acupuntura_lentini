import "./IconButton.css";
import { IconName } from "../../../types/icon.types";
import { Icon } from "../Icon";

type Props = {
  icon: IconName;
  type: "filled" | "standard";
  disabled?: true;
  onclickEvent?: (e?: React.MouseEvent) => void;
};

export const IconButton = (props: Props) => {
  let className = `icon-button ${props.type}`;
  if (props.disabled) className += " disabled";

  return (
    <button className={className} onClick={props.onclickEvent}>
      <Icon icon={props.icon} />
    </button>
  );
};
