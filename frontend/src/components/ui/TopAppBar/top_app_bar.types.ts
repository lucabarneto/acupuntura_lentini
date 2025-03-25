export type TopAppBarType = PresentationTopAppBar | InteractiveTopAppBar;

interface PresentationTopAppBar {
  type: "presentation";
  title: string;
  navigation_back?: true;

  navigateBackEvent?(e?: React.MouseEvent): void;
}

interface InteractiveTopAppBar {
  type: "interactive";
  title: string;
  navigation_back?: true;

  navigateBackEvent?(e?: React.MouseEvent): void;

  deleteEvent(e?: React.MouseEvent): void;
}
