import { IconButton } from "../IconButton";
import "./TopAppBar.css";

type Props = {
  title: string;
  navigation?: true;

  deleteAction(): void;
};

export const TopAppBar = ({ title, navigation, deleteAction }: Props) => {
  return (
    <header className="top-app-bar">
      {navigation && <IconButton icon="arrow_back" type="standard" />}
      <h3>{title}</h3>
      <div>
        <IconButton icon="edit" type="standard" />
        <IconButton icon="delete" type="standard" onclickEvent={deleteAction} />
      </div>
    </header>
  );
};
