import "./ConsultationTechniques.css";
import { TextCard } from "../../../../components/ui/Card/TextCard";
import { IConsultation } from "../../types/consultation.types";

type Props = {
  consultation: IConsultation;
  addEvent(e?: React.MouseEvent): void;
};

export const ConsultationTechniques = (props: Props) => {
  const { consultation, addEvent } = props;

  return (
    <article>
      <h2>Técnicas empleadas</h2>
      {consultation.resources.length === 0 ? (
        <TextCard
          buttonIcon="add"
          buttonLabel="Añadir técnicas"
          title="Sin técnicas empleadas"
          text="Agrega las técnicas que hayas utilizado en la sesión con el paciente haciendo click en el botón de abajo."
          clickEvent={addEvent}
        />
      ) : (
        <div className="consultation-techniques">
          {consultation.resources.map((refEntity, index) => {
            return (
              <article className="used-technique" key={index}>
                <img src={refEntity.resource.image} alt="" />
                <div>
                  <h4>{refEntity.resource.title}</h4>
                  <p>
                    Valores seleccionados:{" "}
                    <b>{refEntity.selected_values.join(", ")}</b>
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </article>
  );
};
