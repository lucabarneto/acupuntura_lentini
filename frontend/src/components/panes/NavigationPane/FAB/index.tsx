import "./FAB.css";
import { Icon } from "../../../ui/Icon";
import { NavLink } from "react-router";

export const FAB = () => {
  return (
    <NavLink to="/add">
      <button className="fab">
        <Icon icon="add" />
      </button>
    </NavLink>
  );
};
