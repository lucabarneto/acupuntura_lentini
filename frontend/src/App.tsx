import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Panes } from "./components/panes";
import { NavigationPane } from "./components/panes/NavigationPane";
import { Home } from "./pages/main_pane/Home";
import { Patients } from "./pages/main_pane/Patients";
import { NoDetails } from "./pages/details_pane/NoDetails";
import { PatientDetails } from "./pages/details_pane/PatientDetails";
import { Add } from "./pages/details_pane/Add";
import { AddPatient } from "./pages/details_pane/AddPatient";
import { AddBaziTable } from "./pages/details_pane/AddBaziTable";
import { AddPresumptiveAnalysis } from "./pages/details_pane/AddPresumptiveAnalysis";
import { AddChiefComplaint } from "./pages/details_pane/AddChiefComplaint";
import { ChiefComplaintDetails } from "./pages/details_pane/ChiefComplaintDetails";
import { Resources } from "./pages/main_pane/Resources";
import { ResourceDetails } from "./pages/details_pane/ResourceDetails";
import { Templates } from "./pages/main_pane/Templates";
import { AddTemplate } from "./pages/details_pane/AddTemplate";
import { TemplateDetails } from "./pages/details_pane/TemplateDetails";
import { AddConsultation } from "./pages/details_pane/AddConsultation";
import { ConsultationDetails } from "./pages/details_pane/ConsultationDetails";
import { AddConsultationTechniques } from "./pages/details_pane/AddConsultationTechinques";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavigationPane />
        <Routes>
          <Route
            path="/"
            element={
              <Panes
                defaultMainPane={<Home />}
                defaultDetailsPane={<NoDetails />}
              />
            }
          />
          <Route path="/patients">
            <Route
              index
              element={
                <Panes
                  defaultMainPane={<Patients />}
                  defaultDetailsPane={<NoDetails />}
                />
              }
            />
            <Route
              path=":patient_name"
              element={
                <Panes
                  defaultMainPane={<Patients />}
                  defaultDetailsPane={<PatientDetails />}
                />
              }
            />
          </Route>
          <Route
            path="/chiefcomplaints/:chief_complaint_title"
            element={
              <Panes
                defaultMainPane={<Patients />}
                defaultDetailsPane={<ChiefComplaintDetails />}
              />
            }
          />
          <Route
            path="/consultations/:id"
            element={
              <Panes
                defaultMainPane={<Patients />}
                defaultDetailsPane={<ConsultationDetails />}
              />
            }
          />
          <Route path="/resources">
            <Route
              index
              element={
                <Panes
                  defaultMainPane={<Resources />}
                  defaultDetailsPane={<NoDetails />}
                />
              }
            />
            <Route
              path=":resource_title"
              element={
                <Panes
                  defaultMainPane={<Resources />}
                  defaultDetailsPane={<ResourceDetails />}
                />
              }
            />
          </Route>
          <Route path="/templates">
            <Route
              index
              element={
                <Panes
                  defaultMainPane={<Templates />}
                  defaultDetailsPane={<NoDetails />}
                />
              }
            />
            <Route
              path=":template_title"
              element={
                <Panes
                  defaultMainPane={<Templates />}
                  defaultDetailsPane={<TemplateDetails />}
                />
              }
            />
          </Route>
          <Route path="/add">
            <Route
              index
              element={
                <Panes
                  defaultMainPane={<Home />}
                  defaultDetailsPane={<Add />}
                />
              }
            />
            <Route
              path="patient"
              element={
                <Panes
                  defaultMainPane={<Home />}
                  defaultDetailsPane={<AddPatient />}
                />
              }
            />
            <Route
              path="bazitable"
              element={
                <Panes
                  defaultMainPane={<Home />}
                  defaultDetailsPane={<AddBaziTable />}
                />
              }
            />
            <Route
              path="presumptiveanalysis"
              element={
                <Panes
                  defaultMainPane={<Home />}
                  defaultDetailsPane={<AddPresumptiveAnalysis />}
                />
              }
            />
            <Route
              path="chiefcomplaint"
              element={
                <Panes
                  defaultMainPane={<Home />}
                  defaultDetailsPane={<AddChiefComplaint />}
                />
              }
            />
            <Route
              path="template"
              element={
                <Panes
                  defaultMainPane={<Home />}
                  defaultDetailsPane={<AddTemplate />}
                />
              }
            />
            <Route
              path="consultation"
              element={
                <Panes
                  defaultMainPane={<Home />}
                  defaultDetailsPane={<AddConsultation />}
                />
              }
            />
            <Route
              path="consultationtechniques"
              element={
                <Panes
                  defaultMainPane={<Home />}
                  defaultDetailsPane={<AddConsultationTechniques />}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
