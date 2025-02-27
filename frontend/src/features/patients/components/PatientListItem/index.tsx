import { IPatient } from "../../types/IPatient";
import { ListItem } from "../../../../components/ui/ListItem";

type Props = {
  patient: IPatient;
};

export const PatientListItem = ({ patient }: Props) => {
  return (
    <ListItem
      key={patient._id}
      link={`/patients/${patient._id}`}
      type="image"
      image={
        patient.profile_picture
          ? patient.profile_picture
          : "/src/assets/placeholder.svg"
      }
      alt="Rostro de la persona paciente"
      title={`${patient.first_name} ${patient.last_name}`}
      overline="Paciente"
      text={
        patient.next_appointment
          ? `Próximo turno el ${new Date(
              patient.next_appointment
            ).toLocaleDateString()}`
          : "No posee un turno agendado."
      }
      divider
    />
  );
};
