import "./SearchForm.css";
import { Divider } from "../../../../components/ui/Divider";
import { IconButton } from "../../../../components/ui/IconButton";

type Props = {
  query: string;
  onClearSearchEvent(e?: React.MouseEvent): void;
  onCloseSearchEvent(e?: React.MouseEvent): void;
  onchangeEvent(e: React.ChangeEvent<HTMLInputElement>): void;
};

export const SearchForm = ({
  query,
  onClearSearchEvent,
  onCloseSearchEvent,
  onchangeEvent,
}: Props) => {
  return (
    <form className="search search-form">
      <IconButton
        type="standard"
        icon="arrow_back"
        onclickEvent={onCloseSearchEvent}
      />
      <input
        type="text"
        name="q"
        id="q"
        placeholder="Buscar pacientes..."
        value={query}
        onChange={onchangeEvent}
      />
      <IconButton
        icon="close"
        type="standard"
        onclickEvent={onClearSearchEvent}
      />
      <Divider />
    </form>
  );
};
