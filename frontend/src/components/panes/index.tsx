import { DetailsPane } from "./DetailsPane";
import { MainPane } from "./MainPane";

type Props = {
  defaultMainPane: React.ReactNode;
  defaultDetailsPane: React.ReactNode;
};
export const Panes = (props: Props) => {
  return (
    <>
      <MainPane defaultPane={props.defaultMainPane} />
      <DetailsPane defaultPane={props.defaultDetailsPane} />
    </>
  );
};
