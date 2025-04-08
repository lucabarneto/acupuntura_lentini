import { ImageCard } from "../../../../components/ui/Card/ImageCard";
import { IResource } from "../../types/resource.types";

type Props = {
  resource: IResource;
  text?: string;
  clickEvent(): void;
};
export const ResourceCard = (props: Props) => {
  const { resource, clickEvent, text } = props;

  return (
    <ImageCard
      image={resource.image}
      title={resource.title}
      text={text}
      alt="Recurso"
      clickEvent={clickEvent}
    />
  );
};
