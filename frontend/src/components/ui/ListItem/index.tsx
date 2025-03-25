import { NavLink } from "react-router";
import {
  DefaultListitemType,
  ImageListItemType,
  IconListItemType,
} from "./list_item.types";
import { Divider } from "../Divider";
import { Icon } from "../Icon";
import "./ListItem.css";

type Props = DefaultListitemType | IconListItemType | ImageListItemType;

export const ListItem = (props: Props) => {
  const {
    link,
    state,
    title,
    variant,
    overline,
    text,
    divider,
    dataAttributes,
  } = props;

  return (
    <li>
      <NavLink
        to={link}
        state={state}
        {...dataAttributes}
        className={({ isActive }) =>
          isActive ? "list-item selected" : "list-item"
        }
      >
        {variant === "icon" && <Icon icon={props.icon} />}
        {variant === "image" && <img src={props.image} alt={props.alt} />}
        <div>
          {overline && <div className="list-item-overline">{overline}</div>}
          <h4>{title}</h4>
          {text && <p className="list-item-supporting-text">{text}</p>}
          {divider && <Divider />}
        </div>
      </NavLink>
    </li>
  );
};
