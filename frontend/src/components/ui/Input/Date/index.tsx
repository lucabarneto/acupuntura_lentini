import "./Date.css";

type Props = {
  id: string;
  label: string;
  title?: string;
  value: string;
  error: string;
  onchangeEvent(e: React.ChangeEvent<HTMLInputElement>): void;
  onblurEvent(e: React.ChangeEvent<HTMLInputElement>): void;
};

export const DateInput = ({
  id,
  label,
  title,
  value,
  error,
  onchangeEvent,
  onblurEvent,
}: Props) => {
  return (
    <div className="field">
      <input
        className="field-input field-date"
        type="date"
        id={id}
        name={id}
        placeholder="YYYY-MM-DD"
        title={title}
        value={value}
        onChange={onchangeEvent}
        onBlur={onblurEvent}
      />
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {error !== "" && <p className="error-message">{error}</p>}
    </div>
  );
};
