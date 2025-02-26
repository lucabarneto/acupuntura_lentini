import "./RadioInput.css";
import { Divider } from "../../Divider";

type Props = {
  id: string;
  name: string;
  value: string;
  label: string;
  divider?: true;
  inputProps?: object;
  onclickEvent: () => void;
};

export const RadioInput = ({
  id,
  name,
  value,
  label,
  divider,
  inputProps,
  onclickEvent,
}: Props) => {
  return (
    <div className="radio-input">
      <label htmlFor={id}>{label}</label>
      <input
        type="radio"
        name={name}
        id={id}
        {...inputProps}
        value={value}
        onClick={onclickEvent}
      />
      {divider && <Divider />}
    </div>
  );
};
