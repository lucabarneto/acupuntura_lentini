import "./SegmentedButton.css";
import { NavLink } from "react-router";

type Props = {
  id: string;
  label: string;
  position: "left" | "middle" | "right";
  link: string;

  onclickEvent?(e?: React.MouseEvent): void;
};

export const SegmentedButton = ({
  label,
  id,
  position,
  link,
  onclickEvent,
}: Props) => {
  const className = `button segmented-button ${position}`;

  return (
    <NavLink
      to={link}
      id={id}
      className={({ isActive }) =>
        isActive ? `${className} selected` : className
      }
      onClick={onclickEvent}
    >
      {label}
    </NavLink>
  );
};
