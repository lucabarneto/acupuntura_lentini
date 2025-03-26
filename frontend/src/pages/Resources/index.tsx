import { ImageCard } from "../../components/ui/Card/ImageCard";
import { TopAppBar } from "../../components/ui/TopAppBar";
import { useResource } from "../../features/resources/hooks/useResource";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import "./Resources.css";

export const Resources = () => {
  const { appNavigate, mainNavigationData } = useAppNavigate();
  const { allResources } = useResource();

  return (
    <section className="resources-pane">
      <TopAppBar pane="main" title="Recursos" />
      <div className="resources">
        {allResources.map((resource) => (
          <ImageCard
            key={resource._id}
            image={resource.image}
            title={resource.title}
            alt="Recurso"
            clickEvent={() =>
              appNavigate(`/resources/${resource.title.toLowerCase()}`, {
                ...mainNavigationData,
                detailsPane: "resource",
                resourceId: resource._id,
              })
            }
          />
        ))}
      </div>
    </section>
  );
};
