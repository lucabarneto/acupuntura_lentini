import "./FAB.css";
import { Icon } from "../../../ui/Icon";
import { NavLink } from "react-router";
import { AppNavigateState } from "../../../../hooks/useAppNavigate";

type Props = {
  state: AppNavigateState;
};

export const FAB = (props: Props) => {
  return (
    <NavLink to="/add" state={props.state}>
      <button className="fab">
        <Icon icon="add" />
      </button>
    </NavLink>
  );
};
