import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Panes } from "./components/panes/Panes";
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
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
