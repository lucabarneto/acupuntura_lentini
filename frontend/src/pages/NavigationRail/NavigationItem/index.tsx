import "./NavigationItem.css";
import { Icon } from "../../../components/Icon";

type Props = {
  label: string;
  icon: string;
  selected?: true;
};
export const NavigationItem = ({ label, icon, selected }: Props) => {
  let className = "navigation-item";
  if (selected) className += " selected";

  return (
    <div>
      <a className={className} href="#">
        <div className="icon-container">
          {selected ? <Icon icon={icon} filled /> : <Icon icon={icon} />}
        </div>
        <span>{label}</span>
      </a>
    </div>
  );
};
