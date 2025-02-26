import { useState } from "react";

export const useSearch = <T>(entities: T[], filter: (entity: T) => boolean) => {
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [filteredResults, setFilteredResults] = useState(entities);

  const handleQueryChange = (newValue: string) => setQuery(newValue);

  const toggleSearchVisibility = () =>
    searchActive ? setSearchActive(false) : setSearchActive(true);

  const filterResults = () => setFilteredResults(entities.filter(filter));

  return {
    query,
    searchActive,
    filteredResults,
    handleQueryChange,
    toggleSearchVisibility,
    filterResults,
  };
};
