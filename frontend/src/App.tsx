import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Panes } from "./components/panes";
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
import { AddReport } from "./pages/details_pane/AddReport";
import { ReportDetails } from "./pages/details_pane/ReportDetails";
import { Reports } from "./pages/main_pane/Reports";
import { Login } from "./pages/main_pane/Login";
import { ProtectedRoute } from "./components/panes/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Panes
                  defaultMainPane={<Patients />}
                  defaultDetailsPane={<NoDetails />}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/patients">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Panes
                    defaultMainPane={<Patients />}
                    defaultDetailsPane={<NoDetails />}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path=":patient_name"
              element={
                <ProtectedRoute>
                  <Panes
                    defaultMainPane={<Patients />}
                    defaultDetailsPane={<PatientDetails />}
                  />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/chiefcomplaints/:chief_complaint_title"
            element={
              <ProtectedRoute>
                <Panes
                  defaultMainPane={<Patients />}
                  defaultDetailsPane={<ChiefComplaintDetails />}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/consultations/:id"
            element={
              <ProtectedRoute>
                <Panes
                  defaultMainPane={<Patients />}
                  defaultDetailsPane={<ConsultationDetails />}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/resources">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Panes
                    defaultMainPane={<Resources />}
                    defaultDetailsPane={<NoDetails />}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path=":resource_title"
              element={
                <ProtectedRoute>
                  <Panes
                    defaultMainPane={<Resources />}
                    defaultDetailsPane={<ResourceDetails />}
                  />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/templates">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Panes
                    defaultMainPane={<Templates />}
                    defaultDetailsPane={<NoDetails />}
                  />
                </ProtectedRoute>
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
          <Route path="/reports">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Panes
                    defaultMainPane={<Reports />}
                    defaultDetailsPane={<NoDetails />}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path=":report_title"
              element={
                <ProtectedRoute>
                  <Panes
                    defaultMainPane={<Reports />}
                    defaultDetailsPane={<ReportDetails />}
                  />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/add">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Panes
                    defaultMainPane={<Patients />}
                    defaultDetailsPane={<Add />}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="patient"
              element={
                <ProtectedRoute>
                  <Panes
                    defaultMainPane={<Patients />}
                    defaultDetailsPane={<AddPatient />}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="bazitable"
              element={
                <ProtectedRoute>
                  <Panes
                    defaultMainPane={<Patients />}
                    defaultDetailsPane={<AddBaziTable />}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="presumptiveanalysis"
              element={
                <ProtectedRoute>
                  <Panes
                    defaultMainPane={<Patients />}
                    defaultDetailsPane={<AddPresumptiveAnalysis />}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="chiefcomplaint"
              element={
                <ProtectedRoute>
                  <Panes
                    defaultMainPane={<Patients />}
                    defaultDetailsPane={<AddChiefComplaint />}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="template"
              element={
                <ProtectedRoute>
                  <Panes
                    defaultMainPane={<Patients />}
                    defaultDetailsPane={<AddTemplate />}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="consultation"
              element={
                <ProtectedRoute>
                  <Panes
                    defaultMainPane={<Patients />}
                    defaultDetailsPane={<AddConsultation />}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="consultationtechniques"
              element={
                <ProtectedRoute>
                  <Panes
                    defaultMainPane={<Patients />}
                    defaultDetailsPane={<AddConsultationTechniques />}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="report"
              element={
                <ProtectedRoute>
                  <Panes
                    defaultMainPane={<Patients />}
                    defaultDetailsPane={<AddReport />}
                  />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
