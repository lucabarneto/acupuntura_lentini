import "./ResourceDetails.css";
import { TopAppBar } from "../../../components/ui/TopAppBar";
import { useResource } from "../../../features/resources/hooks/useResource";
import { useAppNavigate } from "../../../hooks/useAppNavigate";

export const ResourceDetails = () => {
  const { extraData } = useAppNavigate();
  const resourceId = extraData.resourceId;
  const { entityData } = useResource(resourceId);
  const { resource } = entityData;

  return (
    resource && (
      <section className="details-section resource-details">
        <TopAppBar pane="details" title="Técnica" />
        <article className="resource-data">
          <img src={resource.image} alt="Imagen del recurso" />
          <div className="personal-data-content">
            <h1>{resource.title}</h1>
            <p>{resource.description}</p>
          </div>
        </article>
        <article>
          <h2>Valores aceptados</h2>
          <p>
            <b>{resource.resource_values.join(" - ")}</b>
          </p>
        </article>
      </section>
    )
  );
};
