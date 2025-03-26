import "./Templates.css";
import { TextCard } from "../../components/ui/Card/TextCard";
import { TopAppBar } from "../../components/ui/TopAppBar";

export const Templates = () => {
  return (
    <section className="templates-pane">
      <TopAppBar pane="main" title="Plantillas" />
      <TextCard
        title="¿Qué es una plantilla?"
        text="Una plantilla es una colección de recursos agrupados según la técnica de medicina a la que pertenecen. Puedes emplearlas en tus consultas para evitar seleccionar individualmente cada recurso."
        icon="info"
      />
    </section>
  );
};
