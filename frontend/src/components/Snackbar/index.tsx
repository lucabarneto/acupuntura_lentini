import "./Snackbar.css";
import { Icon } from "../Icon";

type Props = {
  message: string;
  type: "info" | "success" | "error";
};
export const Snackbar = ({ message, type }: Props) => {
  const className = `snackbar ${type}`;

  return (
    <div className={className}>
      {message} <Icon icon="close" />
    </div>
  );
};
