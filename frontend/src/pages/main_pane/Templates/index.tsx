import "./Templates.css";
import { TextCard } from "../../../components/ui/Card/TextCard";
import { TopAppBar } from "../../../components/ui/TopAppBar";
import { useTemplate } from "../../../features/templates/hooks/useTemplate";
import { NoTemplates } from "../../../features/templates/components/NoTemplates";
import { TemplateListItem } from "../../../features/templates/components/TemplateListItem";
import { useAppNavigate } from "../../../hooks/useAppNavigate";

export const Templates = () => {
  const { entityData, utilityMethods } = useTemplate();
  const { setNavigationState } = useAppNavigate();

  return (
    <section className="templates-pane main-section">
      <TopAppBar pane="main" title="Plantillas" />
      <TextCard
        title="¿Qué es una plantilla?"
        text={`Una plantilla es una colección de técnicas agrupadas según los casos de uso y preferencias. Puedes emplearlas en tus consultas para evitar seleccionar individualmente cada técnica.`}
        icon="info"
      />
      {entityData.allTemplates.length !== 0 ? (
        <>
          <h1 className="compact">Lista de plantillas</h1>
          <ul className="list">
            {entityData.allTemplates.map((template) => (
              <TemplateListItem
                key={template._id}
                template={template}
                link={`/templates/${utilityMethods.createURLName(template)}`}
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
