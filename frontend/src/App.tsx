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

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavigationPane />
        <Routes>
          <Route
            path="/"
            element={
              <Panes defaultMainPane={<Home />} detailsPane={<NoDetails />} />
            }
          />
          <Route path="/patients">
            <Route
              index
              element={
                <Panes
                  defaultMainPane={<Patients />}
                  detailsPane={<NoDetails />}
                />
              }
            />
            <Route
              path=":id"
              element={
                <Panes
                  defaultMainPane={<Patients />}
                  detailsPane={<PatientDetails />}
                />
              }
            />
          </Route>
          <Route path="/add">
            <Route
              index
              element={
                <Panes defaultMainPane={<Home />} detailsPane={<Add />} />
              }
            />
            <Route
              path="patient"
              element={
                <Panes
                  defaultMainPane={<Home />}
                  detailsPane={<AddPatient />}
                />
              }
            />
            <Route
              path="bazitable"
              element={
                <Panes
                  defaultMainPane={<Home />}
                  detailsPane={<AddBaziTable />}
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
