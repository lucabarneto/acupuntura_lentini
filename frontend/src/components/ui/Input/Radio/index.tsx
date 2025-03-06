import "./RadioInput.css";
import { RadioInputType } from "../input.types";

type Props = RadioInputType;

export const RadioInput = (props: Props) => {
  const { id, label, value, name, checked, clickEvent } = props;

  return (
    <div className="radio-input">
      <label htmlFor={id}>{label}</label>
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        defaultChecked={checked ? true : false}
        onClick={clickEvent}
      />
    </div>
  );
};
