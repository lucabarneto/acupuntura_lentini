import { Modal } from "../../../components/ui/Modal";
import { AddHeader } from "../../../components/ui/AddHeader";
import { SelectTechniques } from "../../../features/consultations/components/SelectTechniques";
import { AddConsultationTechniquesForm } from "../../../features/consultations/components/AddConsultationTechniquesForm";
import { AnyObject } from "../../../types/general.types";
import { useAddConsultationTechniques } from "../../../features/consultations/hooks/useAddConsultationTechniques";

const initialForm: AnyObject = {};

export const AddConsultationTechniques = () => {
  const { navigation, addForm, consultationTechniques, entity } =
    useAddConsultationTechniques(initialForm);
  const { techniqueData } = consultationTechniques;

  return (
    <section className="add-consultation-pane">
      <AddHeader
        title="Añadir sesión"
        closeEvent={navigation.confirmLeaveAddFlow}
        formId={addForm.formId}
      />
      <div className="add-content-container">
        {techniqueData.techniques.length === 0 ? (
          <SelectTechniques
            consultationTechniques={consultationTechniques}
            resources={entity.resources}
            templateSelectOptions={entity.templateSelectOptions}
          />
        ) : (
          <AddConsultationTechniquesForm
            consultationTechniques={consultationTechniques}
            form={addForm.form}
            formId={addForm.formId}
          />
        )}
      </div>
      <Modal
        ref={navigation.leaveAddFlowModal.modal}
        title="Salir de añadir técnicas de sesión"
        text="Se perdera todo el progreso hecho. ¿Estás seguro que quieres salir?"
        buttonConfirmLabel="Salir"
        cancelEvent={navigation.leaveAddFlowModal.closeModal}
        confirmEvent={() =>
          navigation.leaveAddFlow(
            navigation.leaveAddFlowModal.state!,
            navigation.setNavigationState("keep", "add")
          )
        }
      />
    </section>
  );
};
