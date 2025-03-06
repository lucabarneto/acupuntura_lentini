export interface TopAppBarType {
  title: string;
  navigationIcon?: true;

  deleteEvent(e?: React.MouseEvent): void;
}
