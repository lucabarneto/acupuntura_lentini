import { TopAppBar } from "../../../components/ui/TopAppBar";
import { ResourceCard } from "../../../features/resources/components/ResourceCard";
import { useResource } from "../../../features/resources/hooks/useResource";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import "./Resources.css";

export const Resources = () => {
  const { appNavigate, setNavigationState } = useAppNavigate();
  const { entityData, utilityMethods } = useResource();

  return (
    <section className="resources-pane main-section">
      <TopAppBar pane="main" title="Técnicas" />
      <h1 className="compact">Lista de técnicas</h1>
      <div className="resources">
        {entityData.allResources.map((resource) => (
          <ResourceCard
            key={resource._id}
            resource={resource}
            clickEvent={() =>
              appNavigate(
                `/resources/${utilityMethods.createURLName(resource)}`,
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
