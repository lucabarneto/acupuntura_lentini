export interface MenuType {
  ref: React.RefObject<HTMLDialogElement | null>;
  children: React.ReactNode;

  clickEvent?(e?: React.MouseEvent): void;
}
