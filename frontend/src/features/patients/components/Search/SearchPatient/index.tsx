import { SearchViewType } from "../../../../search/types/search.types";
import { IPatient } from "../../../types/patient.types";
import { useSearch } from "../../../../search/hooks/useSearch";
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

    return fullName.startsWith(searchData.query.toUpperCase());
  };

  const { searchData, searchMethods } = useSearch(entities, filter);

  return searchData.searchActive ? (
    <div className="search-view">
      <SearchForm
        query={searchData.query}
        closeSearchEvent={searchMethods.closeSearch}
        clearSearchEvent={searchMethods.clearSearch}
        changeEvent={searchMethods.filterResults}
      />
      <div className="search-results">
        {searchData.query === "" ? (
          <SearchNoQuery />
        ) : searchData.filteredResults.length !== 0 ? (
          <div className="search-result-list">
            <h2>Resultados de búsqueda</h2>
            <ul>{searchData.filteredResults.map(mappedResults)}</ul>
          </div>
        ) : (
          <SearchNoResults />
        )}
      </div>
    </div>
  ) : (
    <SearchBar clickEvent={searchMethods.openSearch} />
  );
};
