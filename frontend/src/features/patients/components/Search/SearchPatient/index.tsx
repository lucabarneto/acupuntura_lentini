import { SearchViewType } from "../../../../search/types/search.types";
import { IPatient } from "../../../types/patient.types";
import { useSearch } from "../../../../search/useSearch";
import { SearchForm } from "../../../../search/components/SearchForm";
import { SearchBar } from "../../../../search/components/SearchBar";
import { SearchNoQuery } from "../SearchNoQuery";
import { SearchNoResults } from "../SearchNoResults";

type Props = SearchViewType<IPatient>;

export const SearchViewPatient = (props: Props) => {
  const { entities, mappedResults } = props;

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
        closeSearchEvent={closeSearch}
        clearSearchEvent={clearSearch}
        changeEvent={filterResults}
      />
      <div className="search-results">
        {query === "" ? (
          <SearchNoQuery />
        ) : filteredResults.length !== 0 ? (
          <div className="search-result-list">
            <h2>Resultados de búsqueda</h2>
            <ul>{filteredResults.map(mappedResults)}</ul>
          </div>
        ) : (
          <SearchNoResults />
        )}
      </div>
    </div>
  ) : (
    <SearchBar clickEvent={openSearch} />
  );
};
