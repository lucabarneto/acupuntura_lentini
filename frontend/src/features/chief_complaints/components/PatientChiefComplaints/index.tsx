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

  const { mainNavigationData } = useAppNavigate();

  return (
    <article className="patient-chief-complaints">
      {chiefComplaints.length !== 0 ? (
        <ListDropdown heading="Motivos de consulta">
          {chiefComplaints.map((chiefComplaint) => (
            <ChiefComplaintListItem
              key={chiefComplaint.chief_complaint._id}
              chiefComplaint={chiefComplaint.chief_complaint}
              state={{
                ...mainNavigationData,
                detailsPane: "chiefcomplaint",
                chiefComplaintId: chiefComplaint.chief_complaint._id,
              }}
            />
          ))}
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
