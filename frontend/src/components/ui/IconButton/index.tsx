import "./IconButton.css";
import { Icon } from "../Icon";
import { IconButtonType } from "./icon_button.types";

type Props = IconButtonType;

export const IconButton = (props: Props) => {
  const { icon, ariaLabel, clickEvent, disabled } = props;

  return (
    <button
      className="icon-button"
      aria-label={ariaLabel}
      disabled={disabled ? true : false}
      onClick={clickEvent}
    >
      <Icon icon={icon} />
    </button>
  );
};
