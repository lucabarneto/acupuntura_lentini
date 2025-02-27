import { IconButton } from "../IconButton";
import "./TopAppBar.css";

type Props = {
  title: string;
  navigation?: true;
};

export const TopAppBar = ({ title, navigation }: Props) => {
  return (
    <div className="top-app-bar">
      {navigation && <IconButton icon="arrow_back" type="standard" />}
      <h3>{title}</h3>
      <div>
        <IconButton icon="edit" type="standard" />
        <IconButton icon="delete" type="standard" />
      </div>
    </div>
  );
};
