import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { DetailsPanes } from "../../../types/navigation.types";
import { DetailsPaneSelector } from "../../../utils/paneSelectors";
import "./DetailsPane.css";

type Props = {
  defaultPane: React.ReactNode;
};

export const DetailsPane = (props: Props) => {
  const { navigationData } = useAppNavigate();
  const detailsPane = navigationData?.detailsPane;

  const selectDetailsPane = (pane: DetailsPanes | undefined): React.ReactNode =>
    pane ? DetailsPaneSelector.choosePane(pane) : props.defaultPane;
  const pane = selectDetailsPane(detailsPane);


  return (
    <section id="details-pane" className="details-pane">
      {pane}
    </section>
  );
};
