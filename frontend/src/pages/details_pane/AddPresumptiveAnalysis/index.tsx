import "./AddPresumptiveAnalysis.css";
import { Modal } from "../../../components/ui/Modal";
import { AddHeader } from "../../../components/ui/AddHeader";
import { PatientDetailsPreview } from "../../../features/patients/components/PatientDetailsPreview";
import { PresumptiveAnalysisType } from "../../../features/patients/types/presumptive_analysis.types";
import { AddPresumptiveAnalysisForm } from "../../../features/patients/components/AddPresumptiveAnalysisForm";
import { useAddPresumptiveAnalysis } from "../../../features/patients/hooks/useAddPresumptiveAnalysis";

const initialForm: PresumptiveAnalysisType = {
  meridian_time: "",
  feeding: "",
  yin: "",
  yang: "",
  qi: "",
  xue: "",
  jin_ye: "",
  ancestral_jing: "",
  mental_vitality_jing_shen: "",
};

export const AddPresumptiveAnalysis = () => {
  const { addNavigation, addForm, entityData } =
    useAddPresumptiveAnalysis(initialForm);

  return (
    <section className="add-patient-pane add-presumptive-analysis-pane">
      <AddHeader
        title="Añadir Análisis Presuntivo"
        closeEvent={(e) =>
          addNavigation.openLeaveModal(
            e!,
            `/patients/${entityData.entityURLName}`
          )
        }
        formId={addForm.formId}
      />
      <div>
        {entityData.entity && (
          <PatientDetailsPreview patient={entityData.entity} />
        )}
        <AddPresumptiveAnalysisForm
          formId={addForm.formId}
          form={addForm.form}
        />
      </div>

      <Modal
        ref={addNavigation.leaveModal}
        title="Salir de añadir análisis presuntivo"
        text="Se perdera todo el progreso hecho. ¿Estás seguro que quieres salir?"
        buttonConfirmLabel="Salir"
        cancelEvent={addNavigation.closeLeaveModal}
        confirmEvent={() =>
          addNavigation.leaveFlow({
            patientId: entityData.entityId,
          })
        }
      />
    </section>
  );
};
