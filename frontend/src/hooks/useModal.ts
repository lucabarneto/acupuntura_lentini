import { useState, useRef, RefObject } from "react";

export const useModal = (
  type: "modal" | "non-modal"
): {
  modal: RefObject<HTMLDialogElement | null>;
  openModal(): void;
  closeModal(): void;
  toggleModal(): void;
} => {
  const modal = useRef<null | HTMLDialogElement>(null);
  const [display, setDisplay] = useState<"visible" | "hidden">("hidden");

  const openModal = () => {
    const currentModal = modal.current as HTMLDialogElement;

    if (display === "visible") return;

    if (type === "modal") {
      currentModal.showModal();
    } else {
      currentModal.show();
    }

    currentModal.setAttribute("aria-hidden", "false");
    setDisplay("visible");
  };

  const closeModal = () => {
    const currentModal = modal.current as HTMLDialogElement;

    if (display === "hidden") return;

    currentModal.close();
    currentModal.setAttribute("aria-hidden", "true");
    setDisplay("hidden");
  };

  const toggleModal = () => {
    if (display === "hidden") {
      openModal();
    } else {
      closeModal();
    }
  };

  return { modal: modal, closeModal, openModal, toggleModal };
};
