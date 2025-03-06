export interface MenuType {
  id: string;
  ref: React.RefObject<HTMLDialogElement | null>;
  children: React.ReactNode;
}
