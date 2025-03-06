export interface SearchBarType {
  clickEvent(e?: React.MouseEvent): void;
}

export interface SearchFormType {
  query: string;
  clearSearchEvent(e?: React.MouseEvent): void;
  closeSearchEvent(e?: React.MouseEvent): void;
  changeEvent(e?: React.ChangeEvent<HTMLInputElement>): void;
}

export interface SearchViewType<T> {
  entities: T[];
  mappedResults(entity: T, index?: number, array?: T[]): React.ReactNode;
}
