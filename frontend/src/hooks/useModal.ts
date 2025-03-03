import { useState, useRef } from "react";

export const useModal = (type: "modal" | "non-modal") => {
  const modal = useRef<null | HTMLDialogElement>(null);
  const [display, setDisplay] = useState<"visible" | "hidden">("hidden");
  const [associatedValue, setAssociatedValue] = useState<null | string>(null);

  const openModal = (extra?: string) => {
    const currentModal = modal.current as HTMLDialogElement;

    if (display === "visible") return;

    if (type === "modal") {
      currentModal.showModal();
    } else {
      currentModal.show();
    }

    currentModal.setAttribute("aria-hidden", "false");
    setDisplay("visible");
    if (extra) setAssociatedValue(extra);
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

  return { modal, associatedValue, closeModal, openModal, toggleModal };
};
