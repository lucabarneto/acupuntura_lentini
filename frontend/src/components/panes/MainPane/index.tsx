import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { Patients } from "../../../pages/Patients";
import "./MainPane.css";

type Props = {
  defaultPane: React.ReactNode;
};

export const MainPane = (props: Props) => {
  const { navigationData } = useAppNavigate();
  const previousPane = navigationData?.mainPane;

  const selectMainPaneContent = () => {
    if (previousPane?.includes("/patients")) {
      return <Patients />;
    }

    return props.defaultPane;
  };

  return (
    <div id="main-pane" className="main-pane">
      {selectMainPaneContent()}
    </div>
  );
};
