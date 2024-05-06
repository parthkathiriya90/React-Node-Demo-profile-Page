import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Component/Navigation/Layout";
import "./App.css";
import Login from "./Component/Login";
import PrivateRoute from "./Component/auth/PrivateRoute";
import { AuthProvider } from "./Component/auth/AuthProvider";
import ProtectedRoute from "./Component/auth/ProtectedRoute";
import Register from "./Component/Register";
import UserList from "./Component/UserList";
import UserProfile from "./Component/Profile/UserProfile";
import ChangePassword from "./Component/Profile/ChangePassword";
import VerifyEmail from "./Component/VerifyEmail";
import ForgotPassword from "./Component/ForgotPassword";
import ResetPassword from "./Component/ResetPassword";
import Skills from "./Component/Profile/Skills";
import Experience from "./Component/Profile/Experience";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route
              path="/profile"
              element={<PrivateRoute Component={UserProfile} />}
            />
            <Route
              path="/skills"
              element={<PrivateRoute Component={Skills} />}
            />
            <Route
              path="/experience"
              element={<PrivateRoute Component={Experience} />}
            />
            <Route
              path="/change-password"
              element={<PrivateRoute Component={ChangePassword} />}
            />
            <Route
              path="/list"
              element={<PrivateRoute Component={UserList} />}
            />
            <Route
              path="/register"
              element={<ProtectedRoute Component={Register} />}
            />
            <Route
              path="/forgot-password"
              element={<ProtectedRoute Component={ForgotPassword} />}
            />
            <Route
              path="/reset-password"
              element={<ProtectedRoute Component={ResetPassword} />}
            />
            <Route
              path="/login"
              element={<ProtectedRoute Component={Login} />}
            />
            <Route path="*" element={<ProtectedRoute Component={Login} />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
