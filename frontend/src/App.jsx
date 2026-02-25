import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";

function App() {
  // Keep token in state so App re-renders when it changes
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Routes>
      {/* Protected Feed route */}
      <Route
        path="/"
        element={token ? <Feed /> : <Navigate to="/login" />}
      />

      {/* Pass setToken to Login so it can update state after login */}
      <Route path="/login" element={<Login onLogin={setToken} />} />

      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;