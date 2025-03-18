import { Button } from "../Button";
import "./Card.css";
import { CardType } from "./card.types";

type Props = CardType;
export const Card = (props: Props) => {
  const { title, text, buttonLabel, buttonIcon, clickEvent } = props;
  return (
    <article className="card">
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
