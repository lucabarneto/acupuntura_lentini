import "./ConsultationDetails.css";
import { TopAppBar } from "../../components/ui/TopAppBar";
import { useChiefComplaint } from "../../features/chief_complaints/useChiefComplaint";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { useConsultation } from "../../features/consultations/useConsultation";

export const ConsultationDetails = () => {
  const { extraData, appNavigate, setNavigationState } = useAppNavigate();
  const { patientId, chiefComplaintId, consultationId } = extraData;
  const { chiefComplaint, createURLName } = useChiefComplaint(chiefComplaintId);
  const { consultation } = useConsultation(consultationId);

  const chiefComplaintURLName = chiefComplaint && createURLName(chiefComplaint);

  return (
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
        <article>
          <h1>Sesión del {consultation.date}</h1>
        </article>
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
