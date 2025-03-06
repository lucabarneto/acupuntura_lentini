import "./NavigationItem.css";
import { NavLink } from "react-router";
import { Icon } from "../../../ui/Icon";
import { IconName } from "../../../ui/Icon/icon.types";

type Props = {
  href: string;
  label: string;
  icon: IconName;
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
