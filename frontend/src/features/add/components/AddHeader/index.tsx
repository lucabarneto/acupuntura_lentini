import "./AddHeader.css";
import { IconButton } from "../../../../components/ui/IconButton";

type Props = {
  title: string;
  oncloseEvent(e?: React.MouseEvent): void;
};
export const AddHeader = ({ title, oncloseEvent }: Props) => {
  return (
    <header className="add-header">
      <IconButton icon="close" onclickEvent={oncloseEvent} type="standard" />
      <h3>{title}</h3>
    </header>
  );
};
