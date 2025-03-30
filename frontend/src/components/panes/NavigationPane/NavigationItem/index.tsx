import "./NavigationItem.css";
import { NavLink } from "react-router";
import { Icon } from "../../../ui/Icon";
import { IconName } from "../../../ui/Icon/icon.types";
import {
  AppNavigateState,
  useAppNavigate,
} from "../../../../hooks/useAppNavigate";

type Props = {
  id: string;
  href: string;
  state: AppNavigateState;
  label: string;
  icon: IconName;
};

export const NavigationItem = (props: Props) => {
  const { id, label, state, icon, href } = props;

  const { navigationData } = useAppNavigate();

  const className = () =>
    id === navigationData.mainPane
      ? "navigation-item selected"
      : "navigation-item";

  return (
    <div id={id}>
      <NavLink className={className} to={href} state={state}>
        <div className="icon-container">
          <Icon icon={icon} />
        </div>
        <span>{label}</span>
      </NavLink>
    </div>
  );
};
