import { useState } from "react";
import { Field } from "../../Field";
import "../Input.css";
import { TextAreaType } from "../input.types";
import "./TextArea.css";

type Props = TextAreaType;

export const TextArea = (props: Props) => {
  const [isControlled, setIsControlled] = useState(
    props.defaultValue ? false : true
  );

  let className = "field-input field-textarea";
  if (!isControlled) className += " has-default-value";
  if (props.error) className += " invalid";

  return isControlled ? (
    <Field
      key={`${props.label}-controlled-input`}
      id={props.id}
      label={props.label}
      error={props.error}
      disabled={props.disabled}
    >
      <textarea
        className={className}
        name={props.id}
        id={props.id}
        placeholder="Escribe aquí"
        title={props.title}
        form={props.form}
        required={props.required ? true : false}
        value={props.value}
        onChange={props.changeEvent}
        onBlur={props.blurEvent}
        aria-invalid={props.error ? true : false}
        aria-errormessage={props.error ? `${props.id}-error` : undefined}
      ></textarea>
    </Field>
  ) : (
    <Field
      key={`${props.label}-uncontrolled-input`}
      id={props.id}
      label={props.label}
      error={props.error}
      disabled={props.disabled}
    >
      <textarea
        className={className}
        name={props.id}
        id={props.id}
        placeholder="Escribe aquí"
        title={props.title}
        form={props.form}
        required={props.required ? true : false}
        defaultValue={props.defaultValue}
        onChange={props.changeEvent}
        onBlur={props.blurEvent}
        onClick={() => setIsControlled(true)}
        aria-invalid={props.error ? true : false}
        aria-errormessage={props.error ? `${props.id}-error` : undefined}
      ></textarea>
    </Field>
  );
};
