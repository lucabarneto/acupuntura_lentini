import { Add } from "../pages/Add";
import { AddBaziTable } from "../pages/AddBaziTable";
import { AddChiefComplaint } from "../pages/AddChiefComplaint";
import { AddConsultation } from "../pages/AddConsultation";
import { AddConsultationTechniques } from "../pages/AddConsultationTechinques";
import { AddPatient } from "../pages/AddPatient";
import { AddPresumptiveAnalysis } from "../pages/AddPresumptiveAnalysis";
import { AddTemplate } from "../pages/AddTemplate";
import { ChiefComplaintDetails } from "../pages/ChiefComplaintDetails";
import { ConsultationDetails } from "../pages/ConsultationDetails";
import { Home } from "../pages/Home";
import { PatientDetails } from "../pages/PatientDetails";
import { Patients } from "../pages/Patients";
import { ResourceDetails } from "../pages/ResourceDetails";
import { Resources } from "../pages/Resources";
import { TemplateDetails } from "../pages/TemplateDetails";
import { Templates } from "../pages/Templates";
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
        return <ConsultationDetails/>
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
        return <AddConsultation/>;
      }
      case "addconsultationtechnique": {
        return <AddConsultationTechniques/>;
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
