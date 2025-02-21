import "./RadioInput.css";
import { Divider } from "../../Divider";

type Props = {
  id: string;
  name: string;
  value: string;
  label: string;
  divider?: true;
};

export const RadioInput = ({ id, name, value, label, divider }: Props) => {
  return (
    <div className="radio-input">
      <label htmlFor={id}>{label}</label>
      <input type="radio" name={name} id={id} value={value} />
      {divider && <Divider />}
    </div>
  );
};
