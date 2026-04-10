import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserRegister from "./Auth/UserRegister";
import UserLogin from "./Auth/UserLogin";

import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import CreateReel from "./Pages/CreateReel";

// Check if user has authentication token

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<UserRegister />} />

        <Route path="/login" element={<UserLogin />} />
        <Route path="/" element={<Home />} />

        <Route path="/create-reel" element={<CreateReel />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
