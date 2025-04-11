import { TextCard } from "../../../../components/ui/Card/TextCard";
import { ListDropdown } from "../../../../components/ui/ListDropdown";
import { useAppNavigate } from "../../../../hooks/useAppNavigate";
import { AnyStringObject } from "../../../../types/general.types";
import { ConsultationRef } from "../../types/consultation.types";
import { ConsultationListItem } from "../ConsultationListItem";

type Props = {
  consultations: ConsultationRef[];
  addEvent: () => void;
  stateExtraData: AnyStringObject;
};

export const ChiefComplaintConsultations = (props: Props) => {
  const { consultations, addEvent, stateExtraData } = props;
  const { setNavigationState } = useAppNavigate();

  return (
    <article className="reference-list patient-chief-complaints">
      {consultations.length !== 0 ? (
        <ListDropdown heading="Sesiones">
          <ul>
            {consultations.map((refEntity, index) => {
              const { consultation } = refEntity;
              return (
                <ConsultationListItem
                  key={index}
                  consultation={consultation}
                  state={setNavigationState("keep", "consultation", {
                    ...stateExtraData,
                    consultationId: consultation._id,
                  })}
                />
              );
            })}
          </ul>
        </ListDropdown>
      ) : (
        <ListDropdown heading="Sesiones">
          <TextCard
            title="Sin sesiones"
            text="El paciente no tiene ninguna sesión asociada a este motivo de consulta. Añade una
        haciendo click en el botón de abajo, o apretando el botón '+'' ubicado en
        la parte superior izquierda de la pantalla"
            buttonLabel="Añadir Sesión"
            buttonIcon="add"
            clickEvent={addEvent}
          />
        </ListDropdown>
      )}
    </article>
  );
};
