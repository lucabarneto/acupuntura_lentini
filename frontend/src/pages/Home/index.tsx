import { List } from "../../components/ui/List";
import { Search } from "../../features/search/Search";

export const Home = () => {
  return (
    <>
      <Search />
      <br />
      <List
        type="image"
        image="src/assets/placeholder.svg"
        alt="placeholder image"
        title="Luca Barneto"
        overline="Paciente"
        text="Proximo turno el 28/04/2025"
        divider
      />
    </>
  );
};
