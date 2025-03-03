import { Home } from "../../../pages/Home";
import { Patients } from "../../../pages/Patients";
import "./MainPane.css";
import { useLocation } from "react-router";

type Props = {
  defaultPane: React.ReactNode;
};

export const MainPane = ({ defaultPane }: Props) => {
  const location = useLocation();
  const originalPath = location.state?.from;

  // console.log(location.pathname, location.state);

  const selectMainPaneContent = () => {
    if (!originalPath) return defaultPane;
    if (originalPath.includes("/patient")) return <Patients />;

    return <Home />;
  };

  return (
    <div id="main-pane" className="main-pane">
      {selectMainPaneContent()}
    </div>
  );
};
