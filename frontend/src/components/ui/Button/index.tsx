import "./Button.css";
import { IconName } from "../../../types/icon.types";
import { Icon } from "../Icon";

type Props = {
  label: string;
  type: "filled" | "outlined" | "text";
  icon?: IconName;
  disabled?: true;
  aria?: object;

  onclickEvent?(): void;
};

export const Button = (props: Props) => {
  let className = `button ${props.type}`;
  if (props.disabled) className += " disabled";
  if (props.icon) className += " has-icon";

  return (
    <button className={className} {...props.aria} onClick={props.onclickEvent}>
      {props.icon && <Icon icon={props.icon} />}
      {props.label}
    </button>
  );
};
