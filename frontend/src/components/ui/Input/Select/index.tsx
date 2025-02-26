import "../Input.css";
import "./Select.css";
import { SelectOptions } from "../../../../types/input.types";

type Props = {
  id: string;
  options: SelectOptions[];
};

export const SelectInput = ({ id, options }: Props) => {
  return (
    <select className="field-input field-select" name={id} id={id}>
      <option value="">Elige una opción</option>
      {options.map((option, index) => (
        <option key={`option_${index}`} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
