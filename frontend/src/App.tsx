import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router";
import { NavigationRail } from "./pages/NavigationRail";
import { MainPane } from "./pages/MainPane";
import { Home } from "./pages/MainPane/Home";
import { Patients } from "./pages/MainPane/Patients";
import { DetailsPane } from "./pages/DetailsPane";
import { NoDetails } from "./pages/DetailsPane/NoDetails";
import { Reports } from "./pages/MainPane/Reports";

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
              <>
                <MainPane>
                  <Patients />
                </MainPane>
                <DetailsPane>
                  <NoDetails />
                </DetailsPane>
              </>
            }
          />
          <Route
            path="/reports"
            element={
              <>
                <MainPane>
                  <Reports />
                </MainPane>
                <DetailsPane>
                  <NoDetails />
                </DetailsPane>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
