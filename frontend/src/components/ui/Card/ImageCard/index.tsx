import { ImageCardType } from "./image_card.types";
import "./ImageCard.css";

type Props = ImageCardType;
export const ImageCard = (props: Props) => {
  const { image, alt, title, text, clickEvent } = props;

  return (
    <article className="image-card" onClick={clickEvent}>
      <div className="image-container">
        <img src={image} alt={alt} />
      </div>

      <div className="image-card-content">
        <h4 className="compact">{title}</h4>
        {text && <p>{text}</p>}
      </div>
    </article>
  );
};
