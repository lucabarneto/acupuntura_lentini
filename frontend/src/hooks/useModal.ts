import { useState } from "react";

export const useModal = (
  modal: HTMLDialogElement,
  type: "modal" | "non-modal"
): { openModal(): void; closeModal(): void; toggleModal(): void } => {
  const [display, setDisplay] = useState<"visible" | "hidden">("hidden");

  const openModal = () => {
    if (display === "visible") return;

    if (type === "modal") {
      modal.showModal();
    } else {
      modal.show();
    }

    modal.setAttribute("aria-hidden", "false");
    setDisplay("visible");
  };

  const closeModal = () => {
    if (display === "hidden") return;

    modal.close();
    modal.setAttribute("aria-hidden", "true");
    setDisplay("hidden");
  };

  const toggleModal = () => {
    if (display === "hidden") {
      openModal();
    } else {
      closeModal();
    }
  };

  return { closeModal, openModal, toggleModal };
};
