import { Card } from "../../../../components/ui/Card";
import { PresumptiveAnalysisType } from "../../types/presumptive_analysis.types";
import "./PresumptiveAnalysis.css";

type Props = {
  presumptiveAnalysis?: PresumptiveAnalysisType;
  addEvent: () => void
};

export const PresumptiveAnalysis = (props: Props) => {
  const { presumptiveAnalysis, addEvent } = props;

  return (
    <article className="presumptive-analysis">
      <h2>Análisis presuntivo</h2>
      {presumptiveAnalysis ? (
        <ul>
          <li>
            <b>Tiempo de meridiano:</b> {presumptiveAnalysis.meridian_time}
          </li>
          <li>
            <b>Alimentación:</b> {presumptiveAnalysis.feeding}
          </li>
          <li>
            <b>Yin:</b> {presumptiveAnalysis.yin}
          </li>
          <li>
            <b>Yang:</b> {presumptiveAnalysis.yang}
          </li>
          <li>
            <b>Qi:</b> {presumptiveAnalysis.qi}
          </li>
          <li>
            <b>Xue:</b> {presumptiveAnalysis.xue}
          </li>
          <li>
            <b>Jin Ye:</b> {presumptiveAnalysis.jin_ye}
          </li>
          <li>
            <b>Jing Shen de Vitalidad Mental:</b>{" "}
            {presumptiveAnalysis.mental_vitality_jing_shen}
          </li>
          <li>
            <b>Jing Ancestral:</b> {presumptiveAnalysis.ancestral_jing}
          </li>
        </ul>
      ) : (
        <Card
          title="Sin análisis presuntivo"
          text="Agrega el análisis presuntivo de la persona paciente apretando el botón que se encuentra abajo."
          buttonLabel="Agregar Análisis"
          buttonIcon="add"
          clickEvent={addEvent}
        />
      )}
    </article>
  );
};
