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
  const chiefComplaintHook = useChiefComplaint(chiefComplaintId);
  const consultationHook = useConsultation(consultationId);
  const { modal, openModal, closeModal } = useModal("modal");

  const chiefComplaintURLName =
    chiefComplaintHook.entityData.chiefComplaint &&
    chiefComplaintHook.utilityMethods.createURLName(
      chiefComplaintHook.entityData.chiefComplaint
    );

  return (
    consultationHook.entityData.consultation && (
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
          consultation={consultationHook.entityData.consultation}
          readableDate={consultationHook.entityData.readableDate}
        />
        <ConsultationTechniques
          consultation={consultationHook.entityData.consultation}
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
            consultationHook.crudMethods.deleteConsultation(
              consultationId,
              () => appNavigate("/patients", setNavigationState("keep"))
            )
          }
        />
      </section>
    )
  );
};
