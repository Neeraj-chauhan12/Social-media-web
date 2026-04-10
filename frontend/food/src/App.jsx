import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserRegister from "./Auth/UserRegister";
import UserLogin from "./Auth/UserLogin";

import { Toaster } from "react-hot-toast";


// Check if user has authentication token


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Auth Routes */}
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />

    

      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
