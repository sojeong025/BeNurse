import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page 정리
import SplashPage from "@pages/LoginPage/SplashPage";
import MainPage from "@pages/MainPage/MainPage";
import LoginPage from "@pages/LoginPage/LoginPage";

import DevicePage from "@pages//DevicePage/DevicePage";

import PatientPage from "@pages/PatientPage/PatientPage";
import PatientListPage from "@pages/PatientPage/PatientListPage";
import PatientJournalPage from "@pages/PatientPage/PatientJournalPage";
import PatientDetailPage from "@pages/PatientPage/PatientDetailPage";

import HandOverPage from "@pages/HandOverPage/HandOverPage";
import HandOverWritePage from "@pages/HandOverPage/HandOverWritePage";
import HandOverListPage from "@pages/HandOverPage/HandOverListPage";

import HandOverDetailPage from "../pages/HandOverPage/HandOverDetailPage";
import HandOverPatientList from "../components/templates/HandOver/HandOverPatientList";
import HandOverDetailInfo from "../components/templates/HandOver/HandOverDetailInfo";
import HandOverDetailDosage from "../components/templates/HandOver/HandOverDetailDosage";
import HandOverDetailCC from "../components/templates/HandOver/HandOverDetailCC";
import HandOverDetailSign from "../components/templates/HandOver/HandOverDetailSign";

import TemporaryListPage from "@pages/HandOverPage/TemporaryListPage";

import SchedulePage from "@pages/SchedulePage/SchedulePage";
import OffApplicationPage from "@pages/SchedulePage/OffApplicationPage";
import OffFinishPage from "@pages/SchedulePage/OffFinishPage";

import MyPage from "@pages/MyPage/MyPage";
import NoticePage from "@pages/NoticePage/NoticePage";
import NoticeListPage from "@pages/NoticePage/NoticeListPage";
import NoticeWritePage from "@pages/NoticePage/NoticeWritePage";
import NoticeUpdatePage from "@pages/NoticePage/NoticeUpdatePage";
import KakaoLoginPage from "@pages/LoginPage/KakaoLoginPage";
import JoinPage from "@pages/LoginPage/JoinPage";
import JoinNursePage from "@pages/LoginPage/JoinNursePage";

import AdminPage from "@pages/AdminPage/AdminPage";
import AdminSignupPage from "@pages/AdminPage/AdminSignupPage";
import OAuth2RedirectHandler from "@pages/AdminPage/OAuth2RedirectHandler";
import AdminSelectRolePage from "@pages/AdminPage/AdminSelectRolePage";

export default function routes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<SplashPage />}
      />
      <Route
        path="/main"
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
        path="/handover-write"
        element={<HandOverWritePage />}
      />
      <Route
        path="/handover-list"
        element={<HandOverListPage />}
      />
      <Route
        path="/handover-list/patients"
        element={<HandOverPatientList />}
      />
      <Route
        path="/handover-list/patients/detail"
        element={<HandOverDetailPage />}
      >
        <Route
          path=""
          element={<HandOverDetailInfo />}
        />
        <Route
          path="dosage"
          element={<HandOverDetailDosage />}
        />
        <Route
          path="CC"
          element={<HandOverDetailCC />}
        />
        <Route
          path="sign"
          element={<HandOverDetailSign />}
        />
      </Route>

      <Route
        path="/temporary-list"
        element={<TemporaryListPage />}
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
        path="/off-application-finish"
        element={<OffFinishPage />}
      />
      <Route
        path="/mypage"
        element={<MyPage />}
      />
      <Route
        path="/notice"
        element={<NoticePage />}
      >
        <Route
          path=""
          element={<NoticeListPage />}
        />
        <Route
          path="write"
          element={<NoticeWritePage />}
        />
        <Route
          path=":noticeId/update"
          element={<NoticeUpdatePage />}
        />
      </Route>
      <Route
        path="/admin"
        element={<AdminPage />}
      >
        <Route
          path="signup"
          element={<AdminSignupPage />}
        />
        <Route
          path="role"
          element={<AdminSelectRolePage />}
        />
      </Route>
      <Route
        path="/oauth/callback/kakao"
        element={<OAuth2RedirectHandler />}
      />
    </Routes>
  );
}
