import { TopAppBar } from "../../components/ui/TopAppBar";
import { ResourceCard } from "../../features/resources/components/ResourceCard";
import { useTemplate } from "../../features/templates/hooks/useTemplate";
import { useAppNavigate } from "../../hooks/useAppNavigate";

export const TemplateDetails = () => {
  const { navigationData } = useAppNavigate();
  const templateId = navigationData.templateId;
  const { template } = useTemplate(templateId);

  return (
    <section className="details-section template-details">
      <TopAppBar pane="details" title="Plantilla" />
      <article>
        <div className="template-data">
          <h1>{template.title}</h1>
          <p>{template.description}</p>
        </div>
        <div>
          <h2>Recursos de la plantilla</h2>
          {template.resources.map((resource) => (
            <ResourceCard resource={resource.resource} clickEvent={() => {}} />
          ))}
        </div>
      </article>
    </section>
  );
};
