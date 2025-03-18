import "./PatientDetails.css";
import { useNavigate, useParams } from "react-router";
import { PersonalData } from "../../features/patients/components/PersonalData";
import { TopAppBar } from "../../components/ui/TopAppBar";
import { Birth } from "../../features/patients/components/Birth";
import { Modal } from "../../components/ui/Modal";
import { useModal } from "../../hooks/useModal";
import { usePatient } from "../../features/patients/hooks/usePatient";
import { PresumptiveAnalysis } from "../../features/patients/components/PresumptiveAnalysis";

export const PatientDetails = () => {
  const patientId = useParams().id!;
  const { patient, deletePatient } = usePatient(patientId);
  const { modal, openModal, closeModal } = useModal("modal");
  const navigate = useNavigate();

  return (
    patient && (
      <section className="patient-details-pane">
        <TopAppBar title="Paciente" deleteEvent={() => openModal()} />
        <PersonalData
          data={{
            first_name: patient.first_name,
            last_name: patient.last_name,
            age: patient.age,
            tel: patient.tel,
            mail: patient.mail,
            marital_status: patient.marital_status,
            profile_picture: patient.profile_picture,
          }}
        />
        <Birth
          birth={patient.birth}
          bazi_table={patient.bazi_table}
          patientId={patientId}
        />
        <PresumptiveAnalysis
          presumptiveAnalysis={patient.presumptive_analysis}
          patientId={patientId}
        />
        <Modal
          ref={modal}
          title="Eliminar paciente"
          text="Una vez eliminado, no podrás recuperar la información del paciente. ¿Estás seguro que quieres eliminarlo?"
          buttonConfirmLabel="Eliminar"
          cancelEvent={closeModal}
          confirmEvent={() =>
            deletePatient(patientId, () => navigate("/patients"))
          }
        />
      </section>
    )
  );
};
