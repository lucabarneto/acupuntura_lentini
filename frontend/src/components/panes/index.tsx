import { DetailsPane } from "./DetailsPane";
import { MainPane } from "./MainPane";
import { NavigationPane } from "./NavigationPane";

type Props = {
  defaultMainPane: React.ReactNode;
  defaultDetailsPane: React.ReactNode;
};
export const Panes = (props: Props) => {
  return (
    <>
      <NavigationPane />
      <MainPane defaultPane={props.defaultMainPane} />
      <DetailsPane defaultPane={props.defaultDetailsPane} />
    </>
  );
};
