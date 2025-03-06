import "./Snackbar.css";
import { Icon } from "../Icon";
import { SnackbarType } from "./snackbar.types";

type Props = SnackbarType;

export const Snackbar = (props: Props) => {
  const { message, type } = props;
  const className = `snackbar ${type}`;

  return (
    <div className={className}>
      {message} <Icon icon="close" />
    </div>
  );
};
