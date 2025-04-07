import { useState } from "react";

type UseSearch<T> = {
  searchData: SearchData<T>;
  searchMethods: SearchMethods;
};

type SearchData<T> = {
  query: string;
  searchActive: boolean;
  filteredResults: T[];
};

type SearchMethods = {
  closeSearch(e: React.MouseEvent): void;
  openSearch(e: React.MouseEvent): void;
  clearSearch(e: React.MouseEvent): void;
  filterResults(e: React.ChangeEvent<HTMLInputElement>): void;
};

export const useSearch = <T>(
  entities: T[],
  filter: (entity: T) => boolean
): UseSearch<T> => {
  const [search, setSearch] = useState<SearchData<T>>({
    searchActive: false,
    query: "",
    filteredResults: entities,
  });

  const closeSearch = (e: React.MouseEvent): void => {
    e.preventDefault();
    setSearch((prev) => {
      return {
        ...prev,
        searchActive: false,
      };
    });
  };

  const openSearch = (e: React.MouseEvent): void => {
    e.preventDefault();
    setSearch((prev) => {
      return {
        ...prev,
        searchActive: true,
      };
    });
  };

  const clearSearch = (e: React.MouseEvent): void => {
    e.preventDefault();
    setSearch((prev) => {
      return {
        ...prev,
        query: "",
      };
    });
  };

  const filterResults = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch((prev) => {
      return {
        ...prev,
        query: e.target.value,
        filteredResults: entities.filter(filter),
      };
    });
  };

  return {
    searchData: search,
    searchMethods: { closeSearch, openSearch, clearSearch, filterResults },
  };
};
