import "./SearchBar.css";
import { IconButton } from "../../../../components/ui/IconButton";
import { SearchBarType } from "../../types/search.types";

type Props = SearchBarType;

export const SearchBar = (props: Props) => {
  const { clickEvent } = props;

  return (
    <div className="search search-bar" onClick={clickEvent}>
      <input type="text" name="q" id="q" placeholder="Buscar pacientes..." />
      <IconButton icon="search" ariaLabel="Buscar" clickEvent={clickEvent} />
    </div>
  );
};
