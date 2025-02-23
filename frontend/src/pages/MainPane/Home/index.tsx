import { List } from "../../../components/List";
import { Search } from "../components/Search";

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
