export interface TopAppBarType {
  title: string;
  goBackIcon?: true;

  deleteEvent(e?: React.MouseEvent): void;
  goBackEvent?(e?: React.MouseEvent): void;
}
