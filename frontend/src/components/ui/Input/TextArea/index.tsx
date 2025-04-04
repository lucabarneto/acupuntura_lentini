import { Field } from "../../Field";
import "../Input.css";
import { TextAreaType } from "../input.types";
import "./TextArea.css";

type Props = TextAreaType;

export const TextArea = (props: Props) => {
  const {
    id,
    title,
    label,
    form,
    required,
    disabled,
    error,
    value,
    changeEvent,
    blurEvent,
  } = props;

  return (
    <Field id={id} label={label} error={error} disabled={disabled}>
      <textarea
        className="field-input field-textarea"
        name={id}
        id={id}
        placeholder="Escribe aquí"
        title={title}
        form={form}
        required={required ? true : false}
        value={value}
        onChange={changeEvent}
        onBlur={blurEvent}
        aria-invalid={error ? true : false}
        aria-errormessage={error ? `${id}-error` : undefined}
      ></textarea>
    </Field>
  );
};
