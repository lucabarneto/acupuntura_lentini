import { NoReports } from "../../../features/reports/components/NoReports";
import { ReportListItem } from "../../../features/reports/components/ReportListItem";
import { useReport } from "../../../features/reports/hooks/useReport";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import "./Reports.css";

export const Reports = () => {
  const { entityData } = useReport();
  const { setNavigationState } = useAppNavigate();

  return (
    <section className="reports-pane">
      <h1 className="compact">Lista de reportes</h1>
      <ul>
        {entityData.allReports.length !== 0 ? (
          entityData.allReports.map((report) => (
            <ReportListItem
              key={report._id}
              report={report}
              state={setNavigationState("keep", "report", {
                reportId: report._id,
              })}
            />
          ))
        ) : (
          <NoReports />
        )}
      </ul>
    </section>
  );
};
