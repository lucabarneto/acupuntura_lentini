import { ListItem } from "../../../../components/ui/ListItem";
import { AppNavigateState } from "../../../../hooks/useAppNavigate";
import { IConsultation } from "../../types/consultation.types";

type Props = {
  consultation: IConsultation;
  state: AppNavigateState;
};
export const ConsultationListItem = (props: Props) => {
  const { state, consultation } = props;

  console.log(consultation);

  return (
    <ListItem
      variant="default"
      overline="Sesión"
      title={`Sesión del ${consultation.date}`}
      state={state}
      link={`/consultations/${consultation.date}`}
      divider
    />
  );
};
