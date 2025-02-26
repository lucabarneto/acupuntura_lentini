import "./Modal.css";
import { useRef, useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export const Modal = ({ children }: Props) => {
  const modal = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    if (modal && modal.current && !modal.current.open)
      modal.current.showModal();
  }, []);

  return (
    <dialog ref={modal} className="modal">
      {children}
    </dialog>
  );
};
