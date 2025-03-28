import { ListItem } from "../../../../components/ui/ListItem";
import { AppNavigateState } from "../../../../hooks/useAppNavigate";
import { ITemplate } from "../../types/template.types";

type Props = {
  template: ITemplate;
  link: string;
  state: AppNavigateState;
};

export const TemplateListItem = (props: Props) => {
  const { template, link, state } = props;

  return (
    <ListItem
      variant="default"
      title={template.title}
      overline="Plantilla"
      text={`Contiene ${template.resources.length} recursos`}
      link={link}
      state={state}
    />
  );
};
