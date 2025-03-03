import "./Date.css";

type Props = {
  id: string;
  label: string;
  title?: string;
};

export const DateInput = ({ id, label, title }: Props) => {
  return (
    <div className="field">
      <input
        className="field-input field-date"
        type="date"
        id={id}
        name={id}
        placeholder="YYYY-MM-DD"
        title={title}
      />
      <label htmlFor={id} className="field-label">
        {label}
      </label>
    </div>
  );
};
