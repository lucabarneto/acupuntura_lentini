import "./Add.css";
import { Icon } from "../../components/ui/Icon";
import { AddOptions } from "../../features/add/components/AddOptions";

export const Add = () => {
  return (
    <section className="add-pane">
      <Icon icon="add" />
      <h1>Añadir</h1>
      <p>
        Selecciona cualquiera de las opciones de abajo para añadir el respectivo
        elemento.
      </p>
      <AddOptions />
    </section>
  );
};
