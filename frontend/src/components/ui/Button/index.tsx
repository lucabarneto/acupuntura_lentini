import "./Button.css";
import { ButtonType, SubmitButtonType } from "./button.types";
import { Icon } from "../Icon";

type Props = SubmitButtonType | ButtonType;

export const Button = (props: Props) => {
  const { variant, label, ref, disabled, icon, ariaProps, clickEvent, type } =
    props;

  let className = `button ${variant}`;
  if (icon) className += " has-icon";

  return type === "button" ? (
    <button
      type="button"
      ref={ref}
      className={className}
      {...ariaProps}
      disabled={disabled ? true : false}
      onClick={clickEvent}
    >
      {icon && <Icon icon={icon} />}
      {label}
    </button>
  ) : (
    <button
      type="submit"
      form={props.form}
      ref={ref}
      className={className}
      {...ariaProps}
      disabled={disabled ? true : false}
      onClick={clickEvent}
    >
      {icon && <Icon icon={icon} />}
      {label}
    </button>
  );
};
