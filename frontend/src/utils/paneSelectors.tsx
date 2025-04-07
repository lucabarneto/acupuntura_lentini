import { Add } from "../pages/details_pane/Add";
import { AddBaziTable } from "../pages/details_pane/AddBaziTable";
import { AddChiefComplaint } from "../pages/details_pane/AddChiefComplaint";
import { AddConsultation } from "../pages/details_pane/AddConsultation";
import { AddConsultationTechniques } from "../pages/details_pane/AddConsultationTechinques";
import { AddPatient } from "../pages/details_pane/AddPatient";
import { AddPresumptiveAnalysis } from "../pages/details_pane/AddPresumptiveAnalysis";
import { AddTemplate } from "../pages/details_pane/AddTemplate";
import { ChiefComplaintDetails } from "../pages/details_pane/ChiefComplaintDetails";
import { ConsultationDetails } from "../pages/details_pane/ConsultationDetails";
import { Home } from "../pages/main_pane/Home";
import { PatientDetails } from "../pages/details_pane/PatientDetails";
import { Patients } from "../pages/main_pane/Patients";
import { ResourceDetails } from "../pages/details_pane/ResourceDetails";
import { Resources } from "../pages/main_pane/Resources";
import { TemplateDetails } from "../pages/details_pane/TemplateDetails";
import { Templates } from "../pages/main_pane/Templates";
import { DetailsPanes, MainPanes } from "../types/navigation.types";

export class MainPaneSelector {
  static choosePane(pane: MainPanes): React.ReactNode {
    switch (pane) {
      case "home": {
        return <Home />;
      }
      case "appointments": {
        return;
      }
      case "reports": {
        return;
      }
      case "patients": {
        return <Patients />;
      }
      case "resources": {
        return <Resources />;
      }
      case "templates": {
        return <Templates />;
      }

      default: {
        const _exhaustiveCheck: never = pane;
        return _exhaustiveCheck;
      }
    }
  }
}

export class DetailsPaneSelector {
  static choosePane(pane: DetailsPanes): React.ReactNode {
    switch (pane) {
      case "appointment": {
        return;
      }
      case "report": {
        return;
      }
      case "patient": {
        return <PatientDetails />;
      }
      case "resource": {
        return <ResourceDetails />;
      }
      case "template": {
        return <TemplateDetails />;
      }
      case "chiefcomplaint": {
        return <ChiefComplaintDetails />;
      }
      case "consultation": {
        return <ConsultationDetails />;
      }
      case "add": {
        return <Add />;
      }
      case "addpatient": {
        return <AddPatient />;
      }
      case "addbazitable": {
        return <AddBaziTable />;
      }
      case "addpresumptiveanalysis": {
        return <AddPresumptiveAnalysis />;
      }
      case "addchiefcomplaint": {
        return <AddChiefComplaint />;
      }
      case "addconsultation": {
        return <AddConsultation />;
      }
      case "addconsultationtechnique": {
        return <AddConsultationTechniques />;
      }
      case "addappointment": {
        return;
      }
      case "addreport": {
        return;
      }
      case "addtemplate": {
        return <AddTemplate />;
      }
      case "addresource": {
        return;
      }
      case "updatepatient": {
        return;
      }
      case "updatechiefcomplaint": {
        return;
      }
      case "updateconsultation": {
        return;
      }
      case "updateappointment": {
        return;
      }
      case "updatereport": {
        return;
      }
      case "updatetemplate": {
        return;
      }
      case "updateresource": {
        return;
      }

      default: {
        const _exhaustiveCheck: never = pane;
        return _exhaustiveCheck;
      }
    }
  }
}
