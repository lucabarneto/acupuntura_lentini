import { AddHeader } from "../../../components/ui/AddHeader";
import { Modal } from "../../../components/ui/Modal";
import { ITemplateForm } from "../../../features/templates/types/template.types";
import { AddTemplateForm } from "../../../features/templates/components/AddTemplateForm";
import { useAddTemplate } from "../../../features/templates/hooks/useAddTemplate";
import { IResource } from "../../../features/resources/types/resource.types";

const initialForm: ITemplateForm = {
  title: "",
  description: "",
  resources: [],
};

export const AddTemplate = () => {
  const { addNavigation, addForm } = useAddTemplate(initialForm);

  return (
    <section>
      <AddHeader
        title="Agregar plantilla"
        formId={addForm.formId}
        closeEvent={addNavigation.openLeaveModal}
      />
      <div className="add-content-container">
        <AddTemplateForm
          formId={addForm.formId}
          form={addForm.form}
          resources={addForm.resources as IResource[]}
        />
        <p className="required-fields-tip">
          Completa todos los <strong>campos requeridos</strong> (<b>*</b>) para
          poder agregar la plantilla al sistema
        </p>
      </div>
      <Modal
        ref={addNavigation.leaveModal}
        title="Salir de añadir plantilla"
        text="Se perdera todo el progreso hecho. ¿Estás seguro que quieres salir?"
        buttonConfirmLabel="Salir"
        cancelEvent={addNavigation.closeLeaveModal}
        confirmEvent={() => addNavigation.leaveFlow()}
      />
    </section>
  );
};
