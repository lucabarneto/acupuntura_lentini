export interface SelectionModalType {
  id: string;
  ref: React.RefObject<HTMLDialogElement | null>;
  children: React.ReactNode;
}
