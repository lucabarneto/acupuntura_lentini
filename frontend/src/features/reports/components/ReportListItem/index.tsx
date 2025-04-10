import { ListItem } from "../../../../components/ui/ListItem";
import { AppNavigateState } from "../../../../hooks/useAppNavigate";
import { IReport } from "../../types/report.types";

type Props = {
  report: IReport;
  state: AppNavigateState;
};

export const ReportListItem = ({ report, state }: Props) => {
  const creationDate = new Date(report.creation_date).toLocaleDateString();

  return (
    <ListItem
      link={`/reports/${report._id}`}
      state={state}
      variant="default"
      title={`Reporte de ${report.chief_complaint.title}`}
      overline="Reporte"
      text={`Creado el ${creationDate}`}
      divider
    />
  );
};
