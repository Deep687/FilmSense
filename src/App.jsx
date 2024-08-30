import { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { onAuthStateChanged } from "firebase/auth"; // Add this import
import { auth } from "./utils/firebase"; // Add this import (adjust path as needed)
import appStore from "./utils/appStore";
import { addUser, removeUser } from "./utils/userSlice"; // Add this import (adjust path as needed)

// Lazy load components
const LogPage = lazy(() => import("./components/LogPage"));
const Browse = lazy(() => import("./components/Browse"));
import ProtectedRoute from "../src/utils/ProtectedRoute";

function App() {
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email } = user;
        appStore.dispatch(addUser({ uid, displayName, email }));
      } else {
        appStore.dispatch(removeUser());
      }
      setIsAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  return (
    <Provider store={appStore}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<LogPage />} />
            <Route
              path="/browse"
              element={
                <ProtectedRoute>
                  <Browse />
                </ProtectedRoute>
              }
            />
            {/* Add a default route that redirects to /login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
