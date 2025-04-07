import "./AddPresumptiveAnalysis.css";
import { Modal } from "../../components/ui/Modal";
import { AddHeader } from "../../features/add/components/AddHeader";
import { useAdd } from "../../features/add/useAdd";
import { PatientDetailsPreview } from "../../features/patients/components/PatientDetailsPreview";
import { usePatient } from "../../features/patients/usePatient";
import { useEffect } from "react";
import { PresumptiveAnalysisType } from "../../features/patients/types/presumptive_analysis.types";
import { AddPresumptiveAnalysisForm } from "../../features/add/components/AddPresumptiveAnalysisForm";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { useForm } from "../../hooks/useForm";

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
  const { confirmLeaveAddFlow, leaveAddFlowModal, leaveAddFlow } = useAdd();
  const form = useForm(initialForm);
  const { extraData, appNavigate, setNavigationState } = useAppNavigate();
  const patientId = extraData.patientId;
  const { patient, updatePatient, createURLName } = usePatient(patientId);

  const formId = "add-presumptive-analysis-form";
  const patientURLName = createURLName(patient);

  useEffect(() => {
    if (form.formData.isSubmittable) {
      const updatedPatient = {
        ...patient,
        presumptive_analysis: form.formData.fields,
      };

      updatePatient(updatedPatient, () => {
        appNavigate(
          `/patients/${patientURLName}`,
          setNavigationState("keep", "patient", { patientId })
        );
      });
    }
  }, [form.formData.isSubmittable]);

  return (
    <section className="add-patient-pane add-presumptive-analysis-pane">
      <AddHeader
        title="Añadir Análisis Presuntivo"
        closeEvent={(e) =>
          confirmLeaveAddFlow(e!, `/patients/${patientURLName}`)
        }
        formId={formId}
      />
      <div>
        {patient && <PatientDetailsPreview patient={patient} />}
        <AddPresumptiveAnalysisForm formId={formId} form={form} />
      </div>

      <Modal
        ref={leaveAddFlowModal.modal}
        title="Salir de añadir análisis presuntivo"
        text="Se perdera todo el progreso hecho. ¿Estás seguro que quieres salir?"
        buttonConfirmLabel="Salir"
        cancelEvent={leaveAddFlowModal.closeModal}
        confirmEvent={() =>
          leaveAddFlow(
            leaveAddFlowModal.state!,
            setNavigationState("keep", "patient", { patientId })
          )
        }
      />
    </section>
  );
};
