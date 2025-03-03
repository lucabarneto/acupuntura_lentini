import "./FAB.css";
import { Icon } from "../../../ui/Icon";
import { NavLink, useLocation } from "react-router";

export const FAB = () => {
  const { pathname } = useLocation();

  return (
    <NavLink to="/add" state={{ from: pathname }}>
      <button className="fab">
        <Icon icon="add" />
      </button>
    </NavLink>
  );
};
