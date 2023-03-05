import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import AuthProvider from "./context/AuthContext";
import RequireAuth from "./context/RequireAuth";
import UpdateProfile from "./components/UpdateProfile";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <RequireAuth>
              <UpdateProfile />
            </RequireAuth>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App;
