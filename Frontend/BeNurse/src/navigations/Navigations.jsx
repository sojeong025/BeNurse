import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Page 정리
const SplashPage = lazy(() => import("@pages/LoginPage/SplashPage"));
const MainPage = lazy(() => import("@pages/MainPage/MainPage"));
const LoginPage = lazy(() => import("@pages/LoginPage/LoginPage"));

const DevicePage = lazy(() => import("@pages//DevicePage/DevicePage"));

const PatientPage = lazy(() => import("@pages/PatientPage/PatientPage"));
const PatientDetailPage = lazy(() =>
  import("@pages/PatientPage/PatientDetailPage"),
);
const PatientListPage = lazy(() =>
  import("@pages/PatientPage/PatientListPage"),
);
const PatientJournalPage = lazy(() =>
  import("@pages/PatientPage/PatientJournalPage"),
);
const PatientJournalMain = lazy(() =>
  import("@pages/PatientPage/PatientJournalMain"),
);
const PatientJournalWritePage = lazy(() =>
  import("@pages/PatientPage/PatientJournalWritePage"),
);
const PatientJournalUpdatePage = lazy(() =>
  import("@pages/PatientPage/PatientJournalUpdatePage"),
);

const HandOverPage = lazy(() => import("@pages/HandOverPage/HandOverPage"));
const HandOverWritePage = lazy(() =>
  import("@pages/HandOverPage/HandOverWritePages/HandOverWritePage"),
);
const HandOverPatientPage = lazy(() =>
  import("@pages/HandOverPage/HandOverWritePages/HandOverPatientPage"),
);
const HandOverWriteStep = lazy(() =>
  import("@pages/HandOverPage/HandOverWritePages/HandOverWriteStep"),
);
const HandOverListPage = lazy(() =>
  import("@pages/HandOverPage/HandOverListPage"),
);
const HandOverReadPage = lazy(() =>
  import("@pages/HandOverPage/HandOverReadPage"),
);
const HandOverReadDetailPage = lazy(() =>
  import("@pages/HandOverPage/HandOverReadDetailPage"),
);
const HandOverNurseSelectPage = lazy(() =>
  import("@pages/HandOverPage/HandOverNurseSelectPage"),
);
const HandOverFinishPage = lazy(() =>
  import("@pages/HandOverPage/HandOverFinishPage"),
);

const HandOverPatientList = lazy(() =>
  import("@components/templates/HandOver/HandOverPatientList"),
);

const TemporaryListPage = lazy(() =>
  import("@pages/HandOverPage/TemporaryListPage"),
);

import SchedulePage from "@pages/SchedulePage/SchedulePage";
const OffApplicationPage = lazy(() =>
  import("@pages/SchedulePage/OffApplicationPage"),
);
const OffwritePage = lazy(() => import("@pages/SchedulePage/OffwritePage"));
const OffFinishPage = lazy(() => import("@pages/SchedulePage/OffFinishPage"));

const MyPage = lazy(() => import("@pages/MyPage/MyPage"));
const NoticePage = lazy(() => import("@pages/NoticePage/NoticePage"));
const NoticeListPage = lazy(() => import("@pages/NoticePage/NoticeListPage"));
const NoticeWritePage = lazy(() => import("@pages/NoticePage/NoticeWritePage"));
const NoticeUpdatePage = lazy(() =>
  import("@pages/NoticePage/NoticeUpdatePage"),
);
const KakaoLoginPage = lazy(() => import("@pages/LoginPage/KakaoLoginPage"));
const JoinPage = lazy(() => import("@pages/LoginPage/JoinPage"));
const JoinNursePage = lazy(() => import("@pages/LoginPage/JoinNursePage"));

const AdminPage = lazy(() => import("@pages/AdminPage/AdminPage"));
const AdminSignupPage = lazy(() => import("@pages/AdminPage/AdminSignupPage"));
const OAuth2RedirectHandler = lazy(() =>
  import("@pages/AdminPage/OAuth2RedirectHandler"),
);
const AdminSelectRolePage = lazy(() =>
  import("@pages/AdminPage/AdminSelectRolePage"),
);
const AdminMainPage = lazy(() => import("../pages/AdminPage/AdminMainPage"));
const AdminManagementPage = lazy(() =>
  import("../pages/AdminPage/AdminManagementPage"),
);
const NotFoundPage = lazy(() => import("../pages/AdminPage/NotFoundPage"));

const ScheduleCreatePage = lazy(() =>
  import("../pages/ScheduleCreatePage/ScheduleCreatePage"),
);
const ScheduleCreateIntroPage = lazy(() =>
  import("../pages/ScheduleCreatePage/ScheduleCreateIntroPage"),
);

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
          path=":patientId/detail"
          element={<PatientDetailPage />}
        />
        <Route
          path=":patientId/detail/journal"
          element={<PatientJournalPage />}
        >
          <Route
            path=""
            element={<PatientJournalMain />}
          />
          <Route
            path="write"
            element={<PatientJournalWritePage />}
          />
          <Route
            path=":journalId/update"
            element={<PatientJournalUpdatePage />}
          />
        </Route>
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
        path="/handover-write/:patientId"
        element={<HandOverPatientPage />}
      />
      <Route
        path="/handover-write/:patientId/patients/write"
        element={<HandOverWriteStep />}
      />
      <Route
        path="/handover-write/nurse"
        element={<HandOverNurseSelectPage />}
      />
      <Route
        path="/handover-write/complete"
        element={<HandOverFinishPage />}
      />
      <Route
        path="/handover-list"
        element={<HandOverListPage />}
      />
      <Route
        path="/handover-read/:handoversetId"
        element={<HandOverReadPage />}
      />
      <Route
        path="/handover-read/:handoversetId/:patientID"
        element={<HandOverReadDetailPage />}
      />
      <Route
        path="/handover-list/patients"
        element={<HandOverPatientList />}
      />

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
        path="/off-application-write"
        element={<OffwritePage />}
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
        <Route
          path=""
          element={<AdminMainPage />}
        />
        <Route
          path="management"
          element={<AdminManagementPage />}
        />
        <Route
          path="create-schedule"
          element={<ScheduleCreatePage />}
        >
          <Route
            path=""
            element={<ScheduleCreateIntroPage />}
          />
        </Route>
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
      <Route
        path="/oauth/callback/kakao"
        element={<OAuth2RedirectHandler />}
      />
    </Routes>
  );
}
