import { TopAppBar } from "../../components/ui/TopAppBar";
import { ResourceCard } from "../../features/resources/components/ResourceCard";
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
          <ResourceCard
            resource={resource}
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
