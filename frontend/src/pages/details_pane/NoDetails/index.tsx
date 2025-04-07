import { Icon } from "../../../components/ui/Icon";
import "./NoDetails.css";

export const NoDetails = () => {
  return (
    <>
      <div className="no-details">
        <div className="no-details-content">
          <Icon icon="desktop_windows" />
          <h2>Panel de detalles</h2>
          <p>
            Aquí verás los <em>detalles</em> de los items que selecciones en el{" "}
            <b>panel principal</b> de la izquierda
          </p>
        </div>
      </div>
    </>
  );
};
