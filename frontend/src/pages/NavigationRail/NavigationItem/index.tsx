import "./NavigationItem.css";
import { NavLink } from "react-router";
import { Icon } from "../../../components/Icon";

type Props = {
  href: string;
  label: string;
  icon: string;
};

export const NavigationItem = ({ label, icon, href }: Props) => {
  return (
    <div>
      <NavLink
        className={({ isActive }) =>
          isActive ? `navigation-item selected` : "navigation-item"
        }
        to={href}
      >
        <div className="icon-container">
          <Icon icon={icon} />
        </div>
        <span>{label}</span>
      </NavLink>
    </div>
  );
};
