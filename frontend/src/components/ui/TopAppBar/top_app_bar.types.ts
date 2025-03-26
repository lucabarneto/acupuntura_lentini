export type TopAppBarType = MainPaneTopAppBar | DetailsPaneTopAppBar;

type MainPaneTopAppBar = {
  pane: "main";
  title: string;
  navigation_back?: true;

  navigateBackEvent?(e?: React.MouseEvent): void;
};

type DetailsPaneTopAppBar = {
  pane: "details";
  title: string;
  navigation_back?: true;

  navigateBackEvent?(e?: React.MouseEvent): void;

  deleteEvent?(e?: React.MouseEvent): void;
};
