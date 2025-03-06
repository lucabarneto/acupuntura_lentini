import "./Menu.css";
import { MenuType } from "./menu.types";

type Props = MenuType;

export const Menu = (props: Props) => {
  const { id, ref, children } = props;
  return (
    <dialog className="menu" id={id} ref={ref} role="menu">
      <div className="scrim"></div>
      <div className="menu-content">{children}</div>
    </dialog>
  );
};
