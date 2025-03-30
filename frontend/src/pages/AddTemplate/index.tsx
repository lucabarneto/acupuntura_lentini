import { useEffect } from "react";
import { AddHeader } from "../../features/add/components/AddHeader";
import { useAdd } from "../../features/add/useAdd";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { Modal } from "../../components/ui/Modal";
import { ITemplateForm } from "../../features/templates/types/template.types";
import { useResource } from "../../features/resources/useResource";
import { AddTemplateForm } from "../../features/add/components/AddTemplateForm";
import { useTemplate } from "../../features/templates/useTemplate";

const initialForm: ITemplateForm = {
  title: "",
  description: "",
  resources: [],
};

export const AddTemplate = () => {
  const { setNavigationState } = useAppNavigate();
  const { confirmLeaveAddFlow, leaveAddFlow, leaveAddFlowModal, formData } =
    useAdd(initialForm);
  const { form } = formData;
  const { allResources } = useResource();
  const { addTemplate, createURLName } = useTemplate();

  const formId = "add-template-form";

  useEffect(() => {
    if (form.isSubmittable) {
      addTemplate(form.fields, (template) => {
        leaveAddFlow(
          `/templates/${createURLName(template)}`,
          setNavigationState("keep", "patient", { templateId: template._id })
        );
      });
    }
  }, [form.isSubmittable]);

  return (
    <section>
      <AddHeader
        title="Agregar plantilla"
        formId={formId}
        closeEvent={confirmLeaveAddFlow}
      />
      <div className="add-content-container">
        <AddTemplateForm
          formId={formId}
          formData={formData}
          resources={allResources}
        />
        <p className="required-fields-tip">
          Completa todos los <strong>campos requeridos</strong> (<b>*</b>) para
          poder agregar la plantilla al sistema
        </p>
      </div>
      <Modal
        ref={leaveAddFlowModal.modal}
        title="Salir de añadir plantilla"
        text="Se perdera todo el progreso hecho. ¿Estás seguro que quieres salir?"
        buttonConfirmLabel="Salir"
        cancelEvent={leaveAddFlowModal.closeModal}
        confirmEvent={() =>
          leaveAddFlow(
            leaveAddFlowModal.state!,
            setNavigationState("keep", "add")
          )
        }
      />
    </section>
  );
};
