import { Button } from "../../Button";
import "./TextCard.css";
import { TextCardType } from "./text_card.types";

type Props = TextCardType;

export const TextCard = (props: Props) => {
  const { title, text, buttonLabel, buttonIcon, clickEvent } = props;
  return (
    <article className="text-card">
      <h4>{title}</h4>
      <p>{text}</p>
      <Button
        type="button"
        variant="filled"
        label={buttonLabel}
        icon={buttonIcon ? buttonIcon : undefined}
        clickEvent={clickEvent}
      />
    </article>
  );
};
