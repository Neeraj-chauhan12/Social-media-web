import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserRegister from "./Auth/UserRegister";
import UserLogin from "./Auth/UserLogin";

import { Toaster } from "react-hot-toast";
import SavedReel from "./components/SavedReel"
import Home from "./Pages/Home";
import CreateReel from "./Pages/CreateReel";
import PartnerProfile from "./Pages/PartnerProfile";
import Profile from "./Pages/Profile";

// Check if user has authentication token

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<UserRegister />} />

        <Route path="/login" element={<UserLogin />} />
        <Route path="/" element={<Home />} />

        <Route path="/create-reel" element={<CreateReel />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/save" element={<SavedReel />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
