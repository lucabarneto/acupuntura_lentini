import "./SearchBar.css";
import { IconButton } from "../../../../components/ui/IconButton";

type Props = {
  onclickEvent(e: React.MouseEvent): void;
};

export const SearchBar = ({ onclickEvent }: Props) => {
  return (
    <div className="search search-bar" onClick={onclickEvent}>
      <input type="text" name="q" id="q" placeholder="Buscar pacientes..." />
      <IconButton icon="search" type="standard" />
    </div>
  );
};
