import {
  DefaultListitem,
  ImageListItem,
  IconListItem,
} from "../../../types/list.types";
import { Divider } from "../Divider";
import { Icon } from "../Icon";
import "./List.css";

type Props = DefaultListitem | IconListItem | ImageListItem;

export const List = (props: Props) => {
  return (
    <li className="list-item">
      {props.type === "icon" && <Icon icon={props.icon} />}
      {props.type === "image" && <img src={props.image} alt={props.alt} />}
      <div>
        {props.overline && (
          <div className="list-item-overline">{props.overline}</div>
        )}
        <h4>{props.title}</h4>
        {props.text && (
          <p className="list-item-supporting-text">{props.text}</p>
        )}
        {props.divider && <Divider />}
      </div>
    </li>
  );
};
