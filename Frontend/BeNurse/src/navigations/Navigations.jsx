import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "@pages/MainPage";
import LoginPage from "@pages/LoginPage";
import DevicePage from "@pages/DevicePage";

export default function routes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<MainPage />}
      />
      <Route
        path="/login"
        element={<LoginPage />}
      />
      <Route
        path="/device"
        element={<DevicePage />}
      />
    </Routes>
  );
}
