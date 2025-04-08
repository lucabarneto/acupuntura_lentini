import { TopAppBar } from "../../../components/ui/TopAppBar";
import { useChiefComplaint } from "../../../features/chief_complaints/hooks/useChiefComplaint";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { useConsultation } from "../../../features/consultations/hooks/useConsultation";
import { ConsultationData } from "../../../features/consultations/components/ConsultationData";
import { ConsultationTechniques } from "../../../features/consultations/components/ConsultationTechniques";
import { Modal } from "../../../components/ui/Modal";
import { useModal } from "../../../hooks/useModal";

export const ConsultationDetails = () => {
  const { extraData, appNavigate, setNavigationState } = useAppNavigate();
  const { patientId, chiefComplaintId, consultationId } = extraData;
  const { modal, openModal, closeModal } = useModal("modal");
  const chiefComplaintHook = useChiefComplaint(chiefComplaintId);
  const { chiefComplaintURLName } = chiefComplaintHook.entityData;
  const consultationHook = useConsultation(consultationId);
  const { consultation, readableDate } = consultationHook.entityData;
  const { deleteConsultation } = consultationHook.crudMethods;

  return (
    consultation && (
      <section className="details-section">
        <TopAppBar
          pane="details"
          title="Sesión"
          navigation_back
          deleteEvent={() => openModal()}
          navigateBackEvent={() =>
            appNavigate(
              `/chiefcomplaints/${chiefComplaintURLName}`,
              setNavigationState("keep", "chiefcomplaint", {
                patientId,
                chiefComplaintId,
              })
            )
          }
        />
        <ConsultationData
          consultation={consultation}
          readableDate={readableDate}
        />
        <ConsultationTechniques
          consultation={consultation}
          addEvent={() =>
            appNavigate(
              `/add/consultationtechniques`,
              setNavigationState("keep", "addconsultationtechnique", {
                consultationId,
              })
            )
          }
        />
        <Modal
          ref={modal}
          title="Eliminar sesión"
          text="Una vez eliminado, no podrás recuperar la información del motivo de consulta. ¿Estás seguro que quieres eliminarlo?"
          buttonConfirmLabel="Eliminar"
          cancelEvent={closeModal}
          confirmEvent={() =>
            deleteConsultation(consultationId, () =>
              appNavigate("/patients", setNavigationState("keep"))
            )
          }
        />
      </section>
    )
  );
};
