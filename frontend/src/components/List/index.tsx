import {
  DefaultListitem,
  ImageListItem,
  IconListItem,
} from "../../types/list.types";
import { Divider } from "../Divider";
import { Icon } from "../Icon";
import "./List.css";

type Props = DefaultListitem | IconListItem | ImageListItem;

export const List = (props: Props) => {
  const { title, overline, type, text, divider } = props;

  return (
    <li className="list-item">
      {type === "icon" && <Icon icon={props.icon} />}
      {type === "image" && <img src={props.image} alt={props.alt} />}
      <div>
        {overline && <div className="list-item-overline">{overline}</div>}
        <h4>{title}</h4>
        {text && <p className="list-item-supporting-text">{text}</p>}
        {divider && <Divider />}
      </div>
    </li>
  );
};
