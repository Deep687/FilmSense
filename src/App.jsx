import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";

import appStore from "./utils/appStore";

// Lazy load components
const LogPage = lazy(() => import("./components/LogPage"));
const Browse = lazy(() => import("./components/Browse"));

function App() {
  return (
    <Provider store={appStore}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<LogPage />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
