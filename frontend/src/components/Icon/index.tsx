import "./Icon.css";

type Props = {
  icon: string;
  filled?: true;
};
export const Icon = ({ icon, filled }: Props) => {
  let className = "icon material-symbols-outlined";
  if (filled) className += " filled";

  return <span className={className}>{icon}</span>;
};
