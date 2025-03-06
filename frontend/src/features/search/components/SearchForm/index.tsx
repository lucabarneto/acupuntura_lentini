import "./SearchForm.css";
import { Divider } from "../../../../components/ui/Divider";
import { IconButton } from "../../../../components/ui/IconButton";
import { SearchFormType } from "../../types/search.types";

type Props = SearchFormType;

export const SearchForm = (props: Props) => {
  const { query, clearSearchEvent, closeSearchEvent, changeEvent } = props;

  return (
    <form className="search search-form">
      <IconButton
        icon="arrow_back"
        ariaLabel="Volver"
        clickEvent={closeSearchEvent}
      />
      <input
        type="text"
        name="q"
        id="q"
        placeholder="Buscar pacientes..."
        value={query}
        onChange={changeEvent}
      />
      <IconButton
        icon="close"
        ariaLabel="Borrar"
        clickEvent={clearSearchEvent}
      />
      <Divider />
    </form>
  );
};
