import "./Templates.css";
import { TextCard } from "../../components/ui/Card/TextCard";
import { TopAppBar } from "../../components/ui/TopAppBar";
import { useTemplate } from "../../features/templates/hooks/useTemplate";
import { NoTemplates } from "../../features/templates/components/NoTemplates";
import { TemplateListItem } from "../../features/templates/components/TemplateListItem";
import { useAppNavigate } from "../../hooks/useAppNavigate";

export const Templates = () => {
  const { allTemplates, createURLName } = useTemplate();
  const { setNavigationState } = useAppNavigate();

  return (
    <section className="templates-pane">
      <TopAppBar pane="main" title="Plantillas" />
      <TextCard
        title="¿Qué es una plantilla?"
        text={`Una plantilla es una colección de recursos agrupados según la técnica de medicina a la que pertenecen. Puedes emplearlas en tus consultas para evitar seleccionar individualmente cada recurso.`}
        icon="info"
      />
      {allTemplates.length !== 0 ? (
        <>
          <h1 className="compact">Lista de plantillas</h1>
          <ul>
            {allTemplates.map((template) => (
              <TemplateListItem
                key={template._id}
                template={template}
                link={`/templates/${createURLName(template)}`}
                state={setNavigationState("keep", "template", {
                  templateId: template._id,
                })}
              />
            ))}
          </ul>
        </>
      ) : (
        <NoTemplates />
      )}
    </section>
  );
};
