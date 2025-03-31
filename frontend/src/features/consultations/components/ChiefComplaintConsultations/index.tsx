import { TextCard } from "../../../../components/ui/Card/TextCard";
import { ListDropdown } from "../../../../components/ui/ListDropdown";
import { useAppNavigate } from "../../../../hooks/useAppNavigate";
import { ConsultationRef } from "../../types/consultation.types";
import { ConsultationListItem } from "../ConsultationListItem";

type Props = {
  consultations: ConsultationRef[];
  addEvent: () => void;
};

export const ChiefComplaintConsultations = (props: Props) => {
  const { consultations, addEvent } = props;
  const { setNavigationState } = useAppNavigate();

  return (
    <article className="reference-list patient-chief-complaints">
      {consultations.length !== 0 ? (
        <ListDropdown heading="Motivos de consulta">
          <ul>
            {consultations.map((refEntity) => {
              const { consultation } = refEntity;
              return (
                <ConsultationListItem
                  key={consultation._id}
                  consultation={consultation}
                  state={setNavigationState("keep", "chiefcomplaint", {
                    chiefComplaintId: consultation.chief_complaint,
                    consultationId: consultation._id,
                  })}
                />
              );
            })}
          </ul>
        </ListDropdown>
      ) : (
        <ListDropdown heading="Motivos de consulta">
          <TextCard
            title="Sin sesiones"
            text="El paciente no tiene ninguna sesión asociada a este motivo de consulta. Agregar una
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
