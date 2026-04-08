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


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Auth Routes */}
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />

        {/* Partner Auth Routes */}
        <Route path="/partner/register" element={<FoodPartnerRegister />} />
        <Route path="/partner/login" element={<FoodPartnerLogin />} />

        {/* User Protected Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/save" element={<SavedReel />} />

        {/* Partner Protected Routes */}
        <Route path="/create-food" element={<CreateReel />} />
        <Route path="/partner/profile" element={<PartnerProfile />} />
        <Route path="/partner/profile/:id" element={<PartnerProfile />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
