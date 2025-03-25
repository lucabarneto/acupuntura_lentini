import "./Menu.css";
import { MenuType } from "./menu.types";

type Props = MenuType;

export const Menu = (props: Props) => {
  const { children, ref, clickEvent } = props;

  return (
    <dialog ref={ref} className="menu" role="menu" onClick={clickEvent}>
      <ul>{children}</ul>
    </dialog>
  );
};
