import "./Menu.css";

type Props = {
  children: React.ReactNode;
  id: string;
  aria?: object;
  ref: React.RefObject<HTMLDialogElement | null>;
};

export const Menu = ({ children, id, ref, aria }: Props) => {
  return (
    <dialog className="menu" id={id} ref={ref} {...aria}>
      <div className="scrim"></div>
      <div className="menu-content">{children}</div>
    </dialog>
  );
};
