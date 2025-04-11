import { ListDropdown } from "../../../../components/ui/ListDropdown";
import { useAppNavigate } from "../../../../hooks/useAppNavigate";
import { ReportsRef } from "../../types/report.types";
import { ReportListItem } from "../ReportListItem";

type Props = {
  reports: ReportsRef[];
};

export const PatientReports = ({ reports }: Props) => {
  const { setNavigationState } = useAppNavigate();

  return (
    reports.length !== 0 && (
      <article className="reference-list patient-reports">
        (
        <ListDropdown heading="Reportes">
          <ul>
            {reports.map((refEntity) => {
              const { report } = refEntity;
              return (
                <ReportListItem
                  key={report._id}
                  report={report}
                  state={setNavigationState("keep", "report", {
                    reportId: report._id,
                  })}
                />
              );
            })}
          </ul>
        </ListDropdown>
        )
      </article>
    )
  );
};
