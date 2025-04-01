import { TextCard } from "../../../../components/ui/Card/TextCard";

type Props = {
  addEvent(e?: React.MouseEvent): void;
};
export const ConsultationTechniques = (props: Props) => {
  return (
    <article>
      <h2>Técnicas empleadas</h2>
      <TextCard
        buttonIcon="add"
        buttonLabel="Añadir técnicas"
        title="Sin técnicas empleadas"
        text="Agrega las técnicas que hayas utilizado en la sesión con el paciente haciendo click en el botón de abajo."
        clickEvent={props.addEvent}
      />
    </article>
  );
};
