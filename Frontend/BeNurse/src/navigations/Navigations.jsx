import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page 정리
import MainPage from "@pages/MainPage/MainPage";
import LoginPage from "@pages/LoginPage/LoginPage";
import DevicePage from "@pages//DevicePage/DevicePage";
import PatientPage from "@pages/PatientPage/PatientPage";
import HandOverPage from "@pages/HandOverPage/HandOverPage";
import SchedulePage from "@pages/SchedulePage/SchedulePage";
import MyPage from "@pages/MyPage/MyPage";
import NoticePage from "@pages/NoticePage/NoticePage";

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
      <Route
        path="/patient"
        element={<PatientPage />}
      />
      <Route
        path="/handover"
        element={<HandOverPage />}
      />
      <Route
        path="/schedule"
        element={<SchedulePage />}
      />
      <Route
        path="/mypage"
        element={<MyPage />}
      />
      <Route
        path="/notice"
        element={<NoticePage />}
      />
    </Routes>
  );
}
