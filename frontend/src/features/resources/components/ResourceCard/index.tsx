import { ImageCard } from "../../../../components/ui/Card/ImageCard";
import { IResource } from "../../types/resource.types";

type Props = {
  resource: IResource;
  clickEvent(): void;
};
export const ResourceCard = (props: Props) => {
  const { resource, clickEvent } = props;

  return (
    <ImageCard
      image={resource.image}
      title={resource.title}
      alt="Recurso"
      clickEvent={clickEvent}
    />
  );
};
