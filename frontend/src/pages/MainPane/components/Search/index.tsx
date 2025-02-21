import "./Search.css";
import { IconButton } from "../../../../components/IconButton";

export const Search = () => {
  return (
    <form className="search">
      <input type="text" name="q" id="q" placeholder="Buscar pacientes..." />
      <IconButton icon="search" type="standard" submit />
    </form>
  );
};
