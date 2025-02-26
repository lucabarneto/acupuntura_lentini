import "./Search.css";
import { IPatient } from "../../../patients/types/IPatient";
import { useSearch } from "../../hooks/useSearch";
import { SearchForm } from "../SearchForm";
import { SearchBar } from "../SearchBar";

type Props<T> = {
  entities: T[];
  mapResults(entity: T, index?: number, array?: T[]): React.ReactNode;

  noQueryView: React.ReactNode;
  noResultsView: React.ReactNode;
};

export const Search = ({
  entities,
  noQueryView,
  noResultsView,
  mapResults,
}: Props<IPatient>) => {
  const filter = (patient: IPatient): boolean => {
    const fullName = `${patient.first_name} ${patient.last_name}`
      .trim()
      .toUpperCase();

    return fullName.startsWith(query.toUpperCase());
  };

  const {
    searchActive,
    filteredResults,
    query,
    closeSearch,
    openSearch,
    clearSearch,
    filterResults,
  } = useSearch(entities, filter);

  return searchActive ? (
    <div className="search-view">
      <SearchForm
        query={query}
        onCloseSearchEvent={closeSearch}
        onClearSearchEvent={clearSearch}
        onchangeEvent={filterResults}
      />
      <div className="search-results">
        {query === "" ? (
          noQueryView
        ) : filteredResults.length !== 0 ? (
          <div className="search-result-list">
            <h2>Resultados de búsqueda</h2>
            <ul>{filteredResults.map(mapResults)}</ul>
          </div>
        ) : (
          noResultsView
        )}
      </div>
    </div>
  ) : (
    <SearchBar onclickEvent={openSearch} />
  );
};
