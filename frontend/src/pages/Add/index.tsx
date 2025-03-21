import "./Add.css";
import { Icon } from "../../components/ui/Icon";
import { SegmentedButton } from "../../components/ui/SegmentedButton";
import { useAppNavigate } from "../../hooks/useAppNavigate";

export const Add = () => {
  const { navigationData } = useAppNavigate();

  return (
    <section className="add-pane">
      <Icon icon="add" />
      <h1>Añadir</h1>
      <p>
        Selecciona cualquiera de las opciones de abajo para añadir el respectivo
        elemento.
      </p>
      <div className="add-options">
        <SegmentedButton
          id="patient"
          state={{ ...navigationData, detailsPane: "addpatient" }}
          label="Paciente"
          position="left"
          link="/add/patient"
          ariaDescription="Ir a interfaz añadir paciente"
        />
        <SegmentedButton
          id="chief_complaint"
          state={navigationData}
          label="Motivo de consulta"
          position="middle"
          link="/add/chief_complaint"
          ariaDescription="Ir a interfaz añadir motivo de consulta"
        />
        <SegmentedButton
          id="consultation"
          state={navigationData}
          label="Sesión"
          position="middle"
          link="/add/consultation"
          ariaDescription="Ir a interfaz añadir sesión"
        />
        <SegmentedButton
          id="appointment"
          state={navigationData}
          label="Turno"
          position="middle"
          link="/add/appointment"
          ariaDescription="Ir a interfaz añadir turno"
        />
        <SegmentedButton
          id="template"
          state={navigationData}
          label="Plantilla"
          position="right"
          link="/add/template"
          ariaDescription="Ir a interfaz añadir plantilla"
        />
      </div>
    </section>
  );
};
