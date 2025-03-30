import { useState } from "react";

export const useSearch = <T>(entities: T[], filter: (entity: T) => boolean) => {
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const [filteredResults, setFilteredResults] = useState(entities);

  const closeSearch = (e: React.MouseEvent): void => {
    e.preventDefault();
    setSearchActive(false);
  };

  const openSearch = (e: React.MouseEvent): void => {
    e.preventDefault();
    setSearchActive(true);
  };

  const clearSearch = (e: React.MouseEvent): void => {
    e.preventDefault();
    setQuery("");
  };

  const filterResults = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
    setFilteredResults(entities.filter(filter));
  };

  return {
    query,
    searchActive,
    filteredResults,
    closeSearch,
    openSearch,
    clearSearch,
    filterResults,
  };
};
