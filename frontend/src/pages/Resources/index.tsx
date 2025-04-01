import { TopAppBar } from "../../components/ui/TopAppBar";
import { ResourceCard } from "../../features/resources/components/ResourceCard";
import { useResource } from "../../features/resources/useResource";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import "./Resources.css";

export const Resources = () => {
  const { appNavigate, setNavigationState } = useAppNavigate();
  const { allResources, createURLName } = useResource();

  return (
    <section className="resources-pane main-section">
      <TopAppBar pane="main" title="Recursos" />
      <h1 className="compact">Lista de recursos</h1>
      <div className="resources">
        {allResources.map((resource) => (
          <ResourceCard
            key={resource._id}
            resource={resource}
            clickEvent={() =>
              appNavigate(
                `/resources/${createURLName(resource)}`,
                setNavigationState("keep", "resource", {
                  resourceId: resource._id,
                })
              )
            }
          />
        ))}
      </div>
    </section>
  );
};
