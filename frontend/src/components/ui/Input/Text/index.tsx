import "../Input.css";
import { TextInputTypes } from "../../../../types/input.types";

type Props = {
  id: string;
  label: string;
  type: TextInputTypes;
  required?: true;
  title?: string;
  form?: string;
  value: string;
  error: string | undefined;
  onchangeEvent(e: React.ChangeEvent<HTMLInputElement>): void;
  onblurEvent(e: React.ChangeEvent<HTMLInputElement>): void;
};

export const TextInput = ({
  id,
  title,
  type,
  label,
  value,
  error,
  required,
  form,
  onchangeEvent,
  onblurEvent,
}: Props) => {
  let inputClassName = "field-input";
  if (error) inputClassName += " invalid";

  return (
    <>
      <div className="field">
        <input
          className={inputClassName}
          type={type}
          form={form}
          id={id}
          name={id}
          placeholder="Escribe aquí"
          title={title}
          value={value}
          onChange={onchangeEvent}
          onBlur={onblurEvent}
          required={required}
        />
        <label htmlFor={id} className="field-label">
          {label}
        </label>
        {error !== "" && <p className="error-message">{error}</p>}
      </div>
    </>
  );
};
