import { TextCard } from "../../../../components/ui/Card/TextCard";
import { ListDropdown } from "../../../../components/ui/ListDropdown";
import { useAppNavigate } from "../../../../hooks/useAppNavigate";
import { ChiefComplaintRef } from "../../types/chief_complaint.types";
import { ChiefComplaintListItem } from "../ChiefComplaintListItem";

type Props = {
  chiefComplaints: ChiefComplaintRef[];
  addEvent: () => void;
};
export const PatientChiefComplaints = (props: Props) => {
  const { chiefComplaints, addEvent } = props;
  const { setNavigationState } = useAppNavigate();

  return (
    <article className="reference-list patient-chief-complaints">
      {chiefComplaints.length !== 0 ? (
        <ListDropdown heading="Motivos de consulta">
          <ul>
            {chiefComplaints.map((refEntity) => {
              const { chief_complaint } = refEntity;
              return (
                chief_complaint.state === "in_progress" && (
                  <ChiefComplaintListItem
                    key={chief_complaint._id}
                    chiefComplaint={chief_complaint}
                    state={setNavigationState("keep", "chiefcomplaint", {
                      patientId: chief_complaint.patient,
                      chiefComplaintId: chief_complaint._id,
                    })}
                  />
                )
              );
            })}
          </ul>
        </ListDropdown>
      ) : (
        <ListDropdown heading="Motivos de consulta">
          <TextCard
            title="Sin motivos de consulta"
            text="El paciente no tiene ningún motivo de consulta actual. Agregar uno
        haciendo click en el botón de abajo, o apretando el botón '+'' ubicado en
        la parte superior izquierda de la pantalla"
            buttonLabel="Añadir motivo de consulta"
            buttonIcon="add"
            clickEvent={addEvent}
          />
        </ListDropdown>
      )}
    </article>
  );
};
