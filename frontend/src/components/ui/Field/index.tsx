import "./Field.css";

type Props = {
  id: string;
  label: string;
  children: React.ReactNode;
};
export const Field = (props: Props) => {
  return (
    <div className="field">
      {props.children}
      <label htmlFor={props.id} className="field-label">
        {props.label}
      </label>
    </div>
  );
};
