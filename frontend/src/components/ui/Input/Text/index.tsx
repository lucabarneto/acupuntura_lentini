import { Field } from "../../Field";
import { TextInputType } from "../input.types";
import "../Input.css";
import "./TextInput.css";

type Props = TextInputType;

export const TextInput = (props: Props) => {
  const {
    id,
    title,
    placeholder,
    type,
    label,
    regex,
    value,
    defaultValue,
    error,
    required,
    disabled,
    form,
    group,
    changeEvent,
    blurEvent,
  } = props;

  let className = "field-input";
  if (type === "date") className += " field-date";
  if (error) className += " invalid";

  return (
    <Field id={id} label={label} error={error} disabled={disabled}>
      <input
        className={className}
        type={type}
        form={form}
        id={id}
        name={id}
        pattern={regex}
        placeholder={placeholder ? placeholder : "Escribe aquí"}
        title={title}
        value={value}
        defaultValue={defaultValue ? defaultValue : undefined}
        data-group={group}
        onChange={changeEvent}
        onBlur={blurEvent}
        required={required ? true : false}
        aria-invalid={error ? true : false}
        aria-errormessage={error ? `${id}-error` : undefined}
      />
    </Field>
  );
};
