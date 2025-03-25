import { TextCard } from "../../../../components/ui/Card/TextCard";
import { PresumptiveAnalysisType } from "../../types/presumptive_analysis.types";

type Props = {
  presumptiveAnalysis?: PresumptiveAnalysisType;
  addEvent: () => void;
};

export const PresumptiveAnalysis = (props: Props) => {
  const { presumptiveAnalysis, addEvent } = props;

  return (
    <article className="presumptive-analysis">
      <h2>Análisis presuntivo</h2>
      {presumptiveAnalysis ? (
        <ul>
          <li className="text-item">
            <b>Tiempo de meridiano:</b> {presumptiveAnalysis.meridian_time}
          </li>
          <li className="text-item">
            <b>Alimentación:</b> {presumptiveAnalysis.feeding}
          </li>
          <li className="text-item">
            <b>Yin:</b> {presumptiveAnalysis.yin}
          </li>
          <li className="text-item">
            <b>Yang:</b> {presumptiveAnalysis.yang}
          </li>
          <li className="text-item">
            <b>Qi:</b> {presumptiveAnalysis.qi}
          </li>
          <li className="text-item">
            <b>Xue:</b> {presumptiveAnalysis.xue}
          </li>
          <li className="text-item">
            <b>Jin Ye:</b> {presumptiveAnalysis.jin_ye}
          </li>
          <li className="text-item">
            <b>Jing Shen de Vitalidad Mental:</b>{" "}
            {presumptiveAnalysis.mental_vitality_jing_shen}
          </li>
          <li className="text-item">
            <b>Jing Ancestral:</b> {presumptiveAnalysis.ancestral_jing}
          </li>
        </ul>
      ) : (
        <TextCard
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
