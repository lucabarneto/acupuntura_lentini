import "./TemplateDetails.css";
import { TopAppBar } from "../../components/ui/TopAppBar";
import { ResourceCard } from "../../features/resources/components/ResourceCard";
import { useResource } from "../../features/resources/useResource";
import { useTemplate } from "../../features/templates/useTemplate";
import { useAppNavigate } from "../../hooks/useAppNavigate";

export const TemplateDetails = () => {
  const { extraData, appNavigate, setNavigationState } = useAppNavigate();
  const templateId = extraData.templateId;
  const { template } = useTemplate(templateId);
  const { createURLName } = useResource();

  return (
    <section className="details-section template-details">
      <TopAppBar pane="details" title="Plantilla" />
      <article>
        <h1>{template.title}</h1>
        <p>{template.description}</p>
      </article>
      <article>
        <h2>Recursos de la plantilla</h2>
        <div className="template-resources">
          {template.resources.map((refEntity) => {
            const { resource } = refEntity;
            return (
              <ResourceCard
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
            );
          })}
        </div>
      </article>
    </section>
  );
};
