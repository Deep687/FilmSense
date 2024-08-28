import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy load components
const LogPage = lazy(() => import("./components/LogPage"));
const Browse = lazy(() => import("./components/Browse"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LogPage />} />
          <Route path="/browse" element={<Browse />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
