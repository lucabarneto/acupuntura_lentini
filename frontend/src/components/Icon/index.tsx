import "./Icon.css";

type Props = {
  label: string;
};
export const Icon = ({ label }: Props) => {
  return <span className={`icon material-symbols-outlined`}>{label}</span>;
};
