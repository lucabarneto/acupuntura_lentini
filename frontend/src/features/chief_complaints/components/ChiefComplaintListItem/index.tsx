import { ListItem } from "../../../../components/ui/ListItem";
import { IChiefComplaint } from "../../types/chief_complaint.types";
import { AppNavigateState } from "../../../../hooks/useAppNavigate";

type Props = {
  chiefComplaint: IChiefComplaint;
  state: AppNavigateState;
};
export const ChiefComplaintListItem = (props: Props) => {
  const { chiefComplaint, state } = props;

  // const chiefComplaintURLTitle = chiefComplaint.title.split(" ").join("_");

  return (
    <ListItem
      variant="default"
      overline="Motivo de consulta"
      title={chiefComplaint.title}
      state={state}
      // link={`/chiefcomplaints/${chiefComplaintURLTitle}`}
      link={`/chiefcomplaints/hola!`}
      divider
    />
  );
};
