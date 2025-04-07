import "./Checkbox.css";
import { CheckboxInputType } from "../input.types";
import { Icon } from "../../Icon";
import { useRef, useState } from "react";

type Props = CheckboxInputType;

export const CheckboxInput = (props: Props) => {
  const { id, label, name, value, changeEvent } = props;

  const [checked, setChecked] = useState(false);
  const checkbox = useRef<HTMLInputElement | null>(null);

  return (
    <div className="input-checkbox">
      <input
        type="checkbox"
        name={name}
        id={id}
        ref={checkbox}
        value={value}
        onChange={(e) => {
          setChecked(checkbox.current!.checked);
          changeEvent!(e);
        }}
      />
      <label htmlFor={id}>
        <Icon icon={checked ? "check_box" : "check_box_outline_blank"} />
        <span>{label}</span>
      </label>
    </div>
  );
};
