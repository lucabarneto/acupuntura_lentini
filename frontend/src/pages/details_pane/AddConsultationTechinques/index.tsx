import { Modal } from "../../../components/ui/Modal";
import { AddHeader } from "../../../components/ui/AddHeader";
import { SelectTechniques } from "../../../features/consultations/components/SelectTechniques";
import { AddConsultationTechniquesForm } from "../../../features/consultations/components/AddConsultationTechniquesForm";
import { AnyObject } from "../../../types/general.types";
import { useAddConsultationTechniques } from "../../../features/consultations/hooks/useAddConsultationTechniques";
import { UseConsultationTechniques } from "../../../features/consultations/hooks/useConsultationTechniques";
import { IResource } from "../../../features/resources/types/resource.types";
import { SelectOptions } from "../../../components/ui/Input/input.types";

const initialForm: AnyObject = {};

export const AddConsultationTechniques = () => {
  const { addNavigation, addForm, entityData } =
    useAddConsultationTechniques(initialForm);
  const consultationTechniques =
    addForm.consultationTechniques as UseConsultationTechniques;
  const { techniqueData } = consultationTechniques;

  return (
    <section className="add-consultation-pane">
      <AddHeader
        title="Añadir sesión"
        closeEvent={addNavigation.openLeaveModal}
        formId={addForm.formId}
      />
      <div className="add-content-container">
        {techniqueData.techniques.length === 0 ? (
          <SelectTechniques
            consultationTechniques={consultationTechniques}
            resources={addForm.resources as IResource[]}
            templateSelectOptions={
              addForm.templateSelectOptions as SelectOptions[]
            }
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
        ref={addNavigation.leaveModal}
        title="Salir de añadir técnicas de sesión"
        text="Se perdera todo el progreso hecho. ¿Estás seguro que quieres salir?"
        buttonConfirmLabel="Salir"
        cancelEvent={addNavigation.closeLeaveModal}
        confirmEvent={() =>
          addNavigation.leaveFlow({ consultationId: entityData.entityId })
        }
      />
    </section>
  );
};
