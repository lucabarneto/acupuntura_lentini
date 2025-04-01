import { TopAppBar } from "../../components/ui/TopAppBar";
import { useChiefComplaint } from "../../features/chief_complaints/useChiefComplaint";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { useConsultation } from "../../features/consultations/useConsultation";
import { ConsultationData } from "../../features/consultations/components/ConsultationData";
import { usePatient } from "../../features/patients/usePatient";
import { ConsultationTechniques } from "../../features/consultations/components/ConsultationTechniques";

export const ConsultationDetails = () => {
  const { extraData, appNavigate, setNavigationState } = useAppNavigate();
  const { patientId, chiefComplaintId, consultationId } = extraData;
  const { patient } = usePatient(patientId);
  const { chiefComplaint, createURLName } = useChiefComplaint(chiefComplaintId);
  const { consultation, readableDate } = useConsultation(consultationId);

  const chiefComplaintURLName = chiefComplaint && createURLName(chiefComplaint);

  return (
    patient &&
    chiefComplaint &&
    consultation && (
      <section className="details-section">
        <TopAppBar
          pane="details"
          title="Sesión"
          navigation_back
          deleteEvent={() => {}}
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
          addEvent={() =>
            appNavigate(
              `/add/consultationtechniques`,
              setNavigationState("keep", "addconsultationtechnique", {
                consultationId,
              })
            )
          }
        />
        {/* <Modal
          ref={modal}
          title="Eliminar motivo de consulta"
          text="Una vez eliminado, no podrás recuperar la información del motivo de consulta. ¿Estás seguro que quieres eliminarlo?"
          buttonConfirmLabel="Eliminar"
          cancelEvent={closeModal}
          confirmEvent={() =>
            deletePatient(patientId, () =>
              appNavigate("/patients", mainNavigationData)
            )
          }
        /> */}
      </section>
    )
  );
};
