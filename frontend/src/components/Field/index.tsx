import "./Field.css";

type Props = {
  id: string;
  label: string;
  children: React.ReactNode;
};
export const Field = ({ id, label, children }: Props) => {
  return (
    <div className="field">
      {children}
      <label htmlFor={id} className="field-label">
        {label}
      </label>
    </div>
  );
};
