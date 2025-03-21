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
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
