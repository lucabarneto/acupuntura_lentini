import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Panes } from "./components/panes";
import { NavigationPane } from "./components/panes/NavigationPane";
import { Home } from "./pages/Home";
import { Patients } from "./pages/Patients";
import { NoDetails } from "./pages/NoDetails";
import { PatientDetails } from "./pages/PatientDetails";
import { Add } from "./pages/Add";
import { AddPatient } from "./pages/AddPatient";
import { AddBaziTable } from "./pages/AddBaziTable";
import { AddPresumptiveAnalysis } from "./pages/AddPresumptiveAnalysis";
import { AddChiefComplaint } from "./pages/AddChiefComplaint";
import { ChiefComplaintDetails } from "./pages/ChiefComplaintDetails";
import { Resources } from "./pages/Resources";
import { ResourceDetails } from "./pages/ResourceDetails";
import { Templates } from "./pages/Templates";
import { AddTemplate } from "./pages/AddTemplate";
import { TemplateDetails } from "./pages/TemplateDetails";
import { AddConsultation } from "./pages/AddConsultation";
import { ConsultationDetails } from "./pages/ConsultationDetails";

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
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
