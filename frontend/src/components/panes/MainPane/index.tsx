import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { MainPanes } from "../../../types/navigation.types";
import { MainPaneSelector } from "../../../utils/paneSelectors";
import "./MainPane.css";

type Props = {
  defaultPane: React.ReactNode;
};

export const MainPane = (props: Props) => {
  const { navigationData } = useAppNavigate();
  const mainPane = navigationData?.mainPane;

  const selectMainPane = (pane: MainPanes): React.ReactNode =>
    pane ? MainPaneSelector.choosePane(pane) : props.defaultPane;
  const pane = selectMainPane(mainPane);

  return (
    <div id="main-pane" className="main-pane">
      {pane}
    </div>
  );
};
