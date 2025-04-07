import { AddHeader } from "../../../components/ui/AddHeader";
import { Modal } from "../../../components/ui/Modal";
import { ITemplateForm } from "../../../features/templates/types/template.types";
import { AddTemplateForm } from "../../../features/templates/components/AddTemplateForm";
import { useAddTemplate } from "../../../features/templates/hooks/useAddTemplate";

const initialForm: ITemplateForm = {
  title: "",
  description: "",
  resources: [],
};

export const AddTemplate = () => {
  const { navigation, addForm } = useAddTemplate(initialForm);

  return (
    <section>
      <AddHeader
        title="Agregar plantilla"
        formId={addForm.formId}
        closeEvent={navigation.confirmLeaveAddFlow}
      />
      <div className="add-content-container">
        <AddTemplateForm
          formId={addForm.formId}
          form={addForm.form}
          resources={addForm.resources}
        />
        <p className="required-fields-tip">
          Completa todos los <strong>campos requeridos</strong> (<b>*</b>) para
          poder agregar la plantilla al sistema
        </p>
      </div>
      <Modal
        ref={navigation.leaveAddFlowModal.modal}
        title="Salir de añadir plantilla"
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
