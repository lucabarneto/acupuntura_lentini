import { DetailsPane } from "./DetailsPane";
import { MainPane } from "./MainPane";

type Props = {
  defaultMainPane: React.ReactNode;
  detailsPane: React.ReactNode;
};
export const Panes = ({ defaultMainPane, detailsPane }: Props) => {
  return (
    <>
      <MainPane defaultPane={defaultMainPane} />
      <DetailsPane pane={detailsPane} />
    </>
  );
};
