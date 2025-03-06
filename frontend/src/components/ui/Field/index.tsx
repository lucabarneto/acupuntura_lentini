import "./Field.css";
import { FieldType } from "./field.types";

type Props = FieldType;
export const Field = (props: Props) => {
  const { label, id, error, children } = props;

  return (
    <div className="field">
      {children}
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {error && (
        <p id={`${id}-error`} className="field-error-message">
          {error}
        </p>
      )}
    </div>
  );
};
