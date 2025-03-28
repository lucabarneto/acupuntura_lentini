import "./InputCard.css";
import { InputCardType } from "./input_card.types";

type Props = InputCardType;
export const InputCard = (props: Props) => {
  const { formId, image, alt, title, text, id, name, value, changeEvent } =
    props;

  return (
    <article className="input-card">
      <input
        className="input-card-checkbox"
        type="checkbox"
        name={name}
        id={id}
        form={formId}
        value={value}
        onChange={changeEvent}
      />
      <label htmlFor={id}>
        <article className="image-card">
          <div className="image-card-image-container">
            <img src={image} alt={alt} />
          </div>
          <div className="image-card-content">
            <h4 className="compact">{title}</h4>
            {text && <p>{text}</p>}
          </div>
        </article>
      </label>
    </article>
  );
};
