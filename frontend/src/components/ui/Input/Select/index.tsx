import "../Input.css";
import "./Select.css";
import { Field } from "../../Field";
import { SelectInputType } from "../input.types";

type Props = SelectInputType;
export const SelectInput = (props: Props) => {
  const {
    id,
    label,
    options,
    title,
    required,
    multiple,
    form,
    error,
    changeEvent,
    blurEvent,
  } = props;

  const className = multiple
    ? "field-input field-select multiple"
    : "field-input field-select";

  return (
    <Field id={id} label={label} error={error}>
      <select
        className={className}
        name={id}
        id={id}
        form={form}
        title={title}
        required={required ? true : false}
        multiple={multiple ? true : false}
        onChange={changeEvent}
        onBlur={blurEvent}
        aria-invalid={error ? true : false}
        aria-errormessage={error ? `${id}-error` : undefined}
      >
        <option value="">Elige una opción</option>
        {options.map((option, index) => (
          <option key={`option_${index}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
};
