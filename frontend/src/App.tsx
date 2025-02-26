import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { NavigationPane } from "./components/panes/NavigationPane";
import { MainPane } from "./components/panes/MainPane";
import { Home } from "./pages/Home";
import { Patients } from "./pages/Patients";
import { DetailsPane } from "./components/panes/DetailsPane";
import { NoDetails } from "./pages/NoDetails";
import { Reports } from "./pages/Reports";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavigationPane />
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
    </Provider>
  );
}

export default App;
