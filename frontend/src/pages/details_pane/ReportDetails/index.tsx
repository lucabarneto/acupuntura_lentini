import "./ReportDetails.css";
import { TopAppBar } from "../../../components/ui/TopAppBar";
import { useReport } from "../../../features/reports/hooks/useReport";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../../components/ui/Modal";

export const ReportDetails = () => {
  const { extraData, appNavigate, setNavigationState } = useAppNavigate();
  const reportId = extraData.reportId;
  const { entityData, crudMethods } = useReport(reportId);
  const { report } = entityData;
  const { deleteReport } = crudMethods;
  const { modal, openModal, closeModal } = useModal("modal");

  return (
    report && (
      <section className="details-section report-details">
        <TopAppBar
          pane="details"
          title="Reporte"
          deleteEvent={() => openModal()}
        />
        <article>
          <h1>Reporte de "{report.chief_complaint.title}"</h1>
          <hr />
          <h2>Diagnóstico</h2>
          <p>{report.diagnosis}</p>
          <h2>Tratamiento</h2>
          <p>{report.treatment}</p>
          <h2>Evolución del paciente</h2>
          <p>{report.last_recorded_evolution}</p>
        </article>
        <Modal
          ref={modal}
          title="Eliminar reporte"
          text="Una vez eliminado, no podrás recuperar la información del paciente. ¿Estás seguro que quieres eliminarlo?"
          buttonConfirmLabel="Eliminar"
          cancelEvent={closeModal}
          confirmEvent={() =>
            deleteReport(reportId, () =>
              appNavigate("/reports", setNavigationState("keep"))
            )
          }
        />
      </section>
    )
  );
};
