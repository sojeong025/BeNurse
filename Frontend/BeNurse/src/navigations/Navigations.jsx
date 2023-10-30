import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page 정리
import MainPage from "@pages/MainPage/MainPage";
import LoginPage from "@pages/LoginPage/LoginPage";

import DevicePage from "@pages//DevicePage/DevicePage";

import PatientPage from "@pages/PatientPage/PatientPage";
import PatientListPage from "../pages/PatientPage/PatientListPage";
import PatientJournalPage from "../pages/PatientPage/PatientJournalPage";
import PatientDetailPage from "../pages/PatientPage/PatientDetailPage";

import HandOverPage from "@pages/HandOverPage/HandOverPage";

import SchedulePage from "@pages/SchedulePage/SchedulePage";
import OffApplicationPage from "@pages/SchedulePage/OffApplicationPage";
import MyPage from "@pages/MyPage/MyPage";
import NoticePage from "@pages/NoticePage/NoticePage";
import KakaoLoginPage from "@pages/LoginPage/KakaoLoginPage";
import JoinPage from "@pages/LoginPage/JoinPage";
import JoinNursePage from "@pages/LoginPage/JoinNursePage";

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
      >
        <Route
          path=""
          element={<KakaoLoginPage />}
        />
        <Route
          path="join"
          element={<JoinPage />}
        />
        <Route
          path="joinNurse"
          element={<JoinNursePage />}
        />
      </Route>
      <Route
        path="/device"
        element={<DevicePage />}
      />
      <Route
        path="/patient"
        element={<PatientPage />}
      >
        <Route
          path=""
          element={<PatientListPage />}
        />
        <Route
          path="detail"
          element={<PatientDetailPage />}
        />
        <Route
          path="detail/journal"
          element={<PatientJournalPage />}
        />
      </Route>
      <Route
        path="/handover"
        element={<HandOverPage />}
      />
      <Route
        path="/schedule"
        element={<SchedulePage />}
      />
      <Route
        path="/off-application"
        element={<OffApplicationPage />}
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
