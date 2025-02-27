import "./Modal.css";

type Props = {
  children: React.ReactNode;
  ref: React.RefObject<HTMLDialogElement | null>;
};

export const Modal = ({ children, ref }: Props) => {
  return (
    <dialog ref={ref} className="modal">
      {children}
    </dialog>
  );
};
