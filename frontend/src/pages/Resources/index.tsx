import { ImageCard } from "../../components/ui/Card/ImageCard";
import { TopAppBar } from "../../components/ui/TopAppBar";
import { useResource } from "../../features/resources/hooks/useResource";
import "./Resources.css";

export const Resources = () => {
  const { allResources } = useResource();

  return (
    <section className="resources-pane">
      <TopAppBar type="presentation" title="Recursos" />
      <div className="resources">
        {allResources.map((resource) => (
          <ImageCard
            key={resource._id}
            image={resource.image}
            title={resource.title}
            alt="Recurso"
          />
        ))}
      </div>
    </section>
  );
};
