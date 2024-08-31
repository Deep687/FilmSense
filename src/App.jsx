import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import appStore from "./utils/appStore";

// Lazy load components
const LogPage = lazy(() => import("./components/LogPage"));
const Browse = lazy(() => import("./components/Browse"));
const Header = lazy(() => import("./components/Header"));

function App() {
  return (
    <Provider store={appStore}>
      <Router>
        <Header /> {/* Add the Header component here */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<LogPage />} />
            <Route path="/browse" element={<Browse />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
