import { Button } from "../../Button";
import { Icon } from "../../Icon";
import "./TextCard.css";
import { TextCardType } from "./text_card.types";

type Props = TextCardType;

export const TextCard = (props: Props) => {
  const { icon, title, text, buttonLabel, buttonIcon, clickEvent } = props;
  return (
    <article className="text-card">
      {icon && <Icon icon={icon} />}
      <h4>{title}</h4>
      <p>{text}</p>
      {buttonLabel && clickEvent && (
        <Button
          type="button"
          variant="filled"
          label={buttonLabel}
          icon={buttonIcon ? buttonIcon : undefined}
          clickEvent={clickEvent}
        />
      )}
    </article>
  );
};
