import "./SegmentedButton.css";
import { NavLink } from "react-router";
import { SegmentedButtonType } from "./segmented_button.types";

type Props = SegmentedButtonType;

export const SegmentedButton = (props: Props) => {
  const { label, id, position, link, state, clickEvent, ariaDescription } =
    props;
  const className = `button segmented-button ${position}`;

  return (
    <NavLink
      to={link}
      state={state}
      id={id}
      aria-description={ariaDescription}
      className={({ isActive }) =>
        isActive ? `${className} selected` : className
      }
      onClick={clickEvent}
    >
      {label}
    </NavLink>
  );
};
