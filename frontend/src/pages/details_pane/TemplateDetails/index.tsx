import "./TemplateDetails.css";
import { TopAppBar } from "../../../components/ui/TopAppBar";
import { ResourceCard } from "../../../features/resources/components/ResourceCard";
import { useResource } from "../../../features/resources/hooks/useResource";
import { useTemplate } from "../../../features/templates/hooks/useTemplate";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { Modal } from "../../../components/ui/Modal";
import { useModal } from "../../../hooks/useModal";

export const TemplateDetails = () => {
  const { extraData, appNavigate, setNavigationState } = useAppNavigate();
  const templateId = extraData.templateId;
  const { modal, openModal, closeModal } = useModal("modal");
  const { entityData, crudMethods } = useTemplate(templateId);
  const { template } = entityData;
  const { deleteTemplate } = crudMethods;
  const { utilityMethods } = useResource();
  const { createURLName } = utilityMethods;

  return (
    template && (
      <section className="details-section template-details">
        <TopAppBar
          pane="details"
          title="Plantilla"
          deleteEvent={() => openModal()}
        />
        <article>
          <h1>{template.title}</h1>
          <p>{template.description}</p>
        </article>
        <article>
          <h2>Técnicas de la plantilla</h2>
          <div className="template-resources">
            {template.resources.map((refEntity) => {
              const { resource } = refEntity;
              return (
                <ResourceCard
                  key={resource._id}
                  resource={resource}
                  clickEvent={() =>
                    appNavigate(
                      `/resources/${createURLName(resource)}`,
                      setNavigationState("keep", "resource", {
                        resourceId: resource._id,
                      })
                    )
                  }
                />
              );
            })}
          </div>
        </article>
        <Modal
          ref={modal}
          title="Eliminar plantilla"
          text="¿Estás seguro que quieres eliminarla?"
          buttonConfirmLabel="Eliminar"
          cancelEvent={closeModal}
          confirmEvent={() =>
            deleteTemplate(templateId, () =>
              appNavigate("/templates", setNavigationState("keep"))
            )
          }
        />
      </section>
    )
  );
};
