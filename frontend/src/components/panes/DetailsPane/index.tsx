import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { Add } from "../../../pages/Add";
import { AddBaziTable } from "../../../pages/AddBaziTable";
import { AddPatient } from "../../../pages/AddPatient";
import { AddPresumptiveAnalysis } from "../../../pages/AddPresumptiveAnalysis";
import { PatientDetails } from "../../../pages/PatientDetails";
import "./DetailsPane.css";

type Props = {
  defaultPane: React.ReactNode;
};

export const DetailsPane = (props: Props) => {
  const { navigationData } = useAppNavigate();
  const detailsPane = navigationData?.detailsPane;

  const selectDetailsPaneContent = () => {
    if (detailsPane === "patient") return <PatientDetails />;
    if (detailsPane === "addbazitable") return <AddBaziTable />;
    if (detailsPane === "addpresumptiveanalysis")
      return <AddPresumptiveAnalysis />;
    if (detailsPane === "add") return <Add />;
    if (detailsPane === "addpatient") return <AddPatient />;

    return props.defaultPane;
  };

  return (
    <section id="details-pane" className="details-pane">
      {selectDetailsPaneContent()}
    </section>
  );
};
