import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router";
import { NavigationRail } from "./pages/NavigationRail";
import { MainPane } from "./pages/MainPane";
import { Home } from "./pages/MainPane/Home";
import { PatientList } from "./pages/MainPane/PatientList";
import { DetailsPane } from "./pages/DetailsPane";
import { NoDetails } from "./pages/NoDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationRail />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MainPane>
                  <Home />
                </MainPane>
                <DetailsPane>
                  <NoDetails />
                </DetailsPane>
              </>
            }
          />
          <Route
            path="/patients"
            element={
              <MainPane>
                <PatientList />
              </MainPane>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
