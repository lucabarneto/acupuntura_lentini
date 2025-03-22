import "./ListDropdown.css";

type Props = {
  children: React.ReactNode;
  heading: string;
};
export const ListDropdown = (props: Props) => {
  return (
    <details className="list-dropdown">
      <summary className="list-heading">{props.heading}</summary>
      {props.children}
    </details>
  );
};
