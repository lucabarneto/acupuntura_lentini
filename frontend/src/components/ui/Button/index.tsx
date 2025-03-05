import "./Button.css";
import { IconName } from "../../../types/icon.types";
import { Icon } from "../Icon";
import { RefObject } from "react";

type Props = {
  label: string;
  type: "filled" | "outlined" | "text";
  icon?: IconName;
  disabled?: true;
  buttonProps?: object;
  aria?: object;
  ref?: RefObject<null | HTMLButtonElement>;

  onclickEvent?(e?: React.MouseEvent): void;
};

export const Button = (props: Props) => {
  let className = `button ${props.type}`;
  if (props.disabled) className += " disabled";
  if (props.icon) className += " has-icon";

  return (
    <button
      ref={props.ref}
      className={className}
      {...props.aria}
      onClick={props.onclickEvent}
      {...props.buttonProps}
    >
      {props.icon && <Icon icon={props.icon} />}
      {props.label}
    </button>
  );
};
