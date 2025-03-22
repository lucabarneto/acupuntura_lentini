import { IPatient } from "../../types/patient.types";
import { ListItem } from "../../../../components/ui/ListItem";
import { AppNavigateState } from "../../../../hooks/useAppNavigate";

type Props = {
  patient: IPatient;
  state: AppNavigateState;
};

export const PatientListItem = ({ patient, state }: Props) => {
  const patientURLName = `${patient.first_name.toLowerCase()}_${patient.last_name.toLowerCase()}`;

  return (
    <ListItem
      link={`/patients/${patientURLName}`}
      state={state}
      variant="image"
      image={
        patient.profile_picture
          ? (patient.profile_picture as string)
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
