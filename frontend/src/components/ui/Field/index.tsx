import "./Field.css";
import { FieldType } from "./field.types";

type Props = FieldType;

export const Field = (props: Props) => {
  const { label, id, error, children, disabled } = props;

  const className = disabled ? "field disabled" : "field";

  return (
    <div className={className}>
      {children}
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {!disabled && error && (
        <p id={`${id}-error`} className="field-error-message">
          {error}
        </p>
      )}
    </div>
  );
};
