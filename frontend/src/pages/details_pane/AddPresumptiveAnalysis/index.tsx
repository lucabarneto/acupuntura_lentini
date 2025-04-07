import "./AddPresumptiveAnalysis.css";
import { Modal } from "../../../components/ui/Modal";
import { AddHeader } from "../../../components/ui/AddHeader";
import { PatientDetailsPreview } from "../../../features/patients/components/PatientDetailsPreview";
import { PresumptiveAnalysisType } from "../../../features/patients/types/presumptive_analysis.types";
import { AddPresumptiveAnalysisForm } from "../../../features/patients/components/AddPresumptiveAnalysisForm";
import { useAddPresumptiveAnalysisa } from "../../../features/patients/hooks/useAddPresumptiveAnalysis";

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
  const { navigation, addForm, entity } =
    useAddPresumptiveAnalysisa(initialForm);

  return (
    <section className="add-patient-pane add-presumptive-analysis-pane">
      <AddHeader
        title="Añadir Análisis Presuntivo"
        closeEvent={(e) =>
          navigation.confirmLeaveAddFlow(
            e!,
            `/patients/${entity.patientURLName}`
          )
        }
        formId={addForm.formId}
      />
      <div>
        {entity.patient && <PatientDetailsPreview patient={entity.patient} />}
        <AddPresumptiveAnalysisForm
          formId={addForm.formId}
          form={addForm.form}
        />
      </div>

      <Modal
        ref={navigation.leaveAddFlowModal.modal}
        title="Salir de añadir análisis presuntivo"
        text="Se perdera todo el progreso hecho. ¿Estás seguro que quieres salir?"
        buttonConfirmLabel="Salir"
        cancelEvent={navigation.leaveAddFlowModal.closeModal}
        confirmEvent={() =>
          navigation.leaveAddFlow(
            navigation.leaveAddFlowModal.state!,
            navigation.setNavigationState("keep", "patient", {
              patientId: entity.patientId,
            })
          )
        }
      />
    </section>
  );
};
