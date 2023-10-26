import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "@pages/MainPage";
import LoginPage from "@pages/LoginPage";
import ThreeTestPage from "@pages/ThreeTestPage";

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
        path="/threeTest"
        element={<ThreeTestPage />}
      />
    </Routes>
  );
}
