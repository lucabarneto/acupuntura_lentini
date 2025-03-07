import "./PatientDetails.css";
import { useNavigate, useParams } from "react-router";
import { PersonalData } from "../../features/patients/components/PersonalData";
import { TopAppBar } from "../../components/ui/TopAppBar";
import { Birth } from "../../features/patients/components/Birth";
import { Modal } from "../../components/ui/Modal";
import { useModal } from "../../hooks/useModal";
import { usePatient } from "../../features/patients/hooks/usePatient";

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
          firstName={patient.first_name}
          lastName={patient.last_name}
          age={patient.age}
          tel={patient.tel}
          mail={patient.mail}
          maritalStatus={patient.marital_status}
          profilePicture={patient.profile_picture as string}
        />
        {patient.birth && (
          <Birth
            date={patient.birth.date}
            time={patient.birth.time}
            location={patient.birth.location}
            bazi_table={patient.birth.bazi_table}
          />
        )}
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
