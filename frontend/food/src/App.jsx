import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserRegister from "./Auth/UserRegister";
import UserLogin from "./Auth/UserLogin";
import FoodPartnerRegister from "./Auth/FoodPartnerRegister";
import FoodPartnerLogin from "./Auth/FoodPartnerLogin";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import CreateReel from "./Pages/CreateReel";
import SavedReel from "./components/SavedReel";
import PartnerProfile from "./Pages/PartnerProfile";
import UserProfile from "./Pages/UserProfile";

// Check if user has authentication token
const isAuthenticated = () => {
  const user = localStorage.getItem("user");
  const partner = localStorage.getItem("partner");
  return !!(user || partner);
};

const isAuthenticatedPartner = () => {
  const token = localStorage.getItem("partner");
  return !!token;
};

// Protect routes that require authentication
function PrivateRoute({ children }) {
  return isAuthenticated() ? (
    children
  ) : <Navigate to="/user/login" replace /> 

}

function PartnerRoute({ children }) {
  return isAuthenticatedPartner() ? (
    children
  ) : <Navigate to="/partner/login" replace />;
}

// Redirect authenticated users away from login/register pages
function PublicRoute({ children }) {
  return isAuthenticated() ? <Navigate to="/" replace /> : children;
}

// Redirect authenticated partner away from login/register pages
function PublicPartnerRoute({ children }) {
  return isAuthenticatedPartner() ? <Navigate to="/" replace /> : children;
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Auth Routes */}
        <Route path="/user/register" element={<PublicRoute><UserRegister /></PublicRoute>} />
        <Route path="/user/login" element={<PublicRoute><UserLogin /></PublicRoute>} />

        {/* Partner Auth Routes */}
        <Route path="/partner/register" element={<PublicPartnerRoute><FoodPartnerRegister /></PublicPartnerRoute>} />
        <Route path="/partner/login" element={<PublicPartnerRoute><FoodPartnerLogin /></PublicPartnerRoute>} />

        {/* User Protected Routes */}
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/profile/:id" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/user/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
        <Route path="/save" element={<PrivateRoute><SavedReel /></PrivateRoute>} />

        {/* Partner Protected Routes */}
        <Route path="/create-food" element={<PartnerRoute><CreateReel /></PartnerRoute>} />
        <Route path="/partner/profile" element={<PartnerRoute><PartnerProfile /></PartnerRoute>} />
        <Route path="/partner/profile/:id" element={<PartnerRoute><PartnerProfile /></PartnerRoute>} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
