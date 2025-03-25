import { Card } from "../../../../components/ui/Card";
import { ListDropdown } from "../../../../components/ui/ListDropdown";
import { useAppNavigate } from "../../../../hooks/useAppNavigate";
import { ChiefComplaintRef } from "../../../patients/types/patient.types";
import { ChiefComplaintListItem } from "../ChiefComplaintListItem";
import "./PatientChiefComplaints.css";

type Props = {
  chiefComplaints: ChiefComplaintRef[];
  addEvent: () => void;
};
export const PatientChiefComplaints = (props: Props) => {
  const { chiefComplaints, addEvent } = props;
  const { navigationData } = useAppNavigate();

  return (
    <article className="reference-list patient-chief-complaints">
      {chiefComplaints.length !== 0 ? (
        <ListDropdown heading="Motivos de consulta">
          <ul>
            {chiefComplaints.map((refEntity) => (
              <ChiefComplaintListItem
                key={refEntity.chief_complaint._id}
                chiefComplaint={refEntity.chief_complaint}
                state={{
                  ...navigationData,
                  detailsPane: "chiefcomplaint",
                  chiefComplaintId: refEntity.chief_complaint._id,
                  patientId: refEntity.chief_complaint.patient,
                }}
              />
            ))}
          </ul>
        </ListDropdown>
      ) : (
        <ListDropdown heading="Motivos de consulta">
          <Card
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
