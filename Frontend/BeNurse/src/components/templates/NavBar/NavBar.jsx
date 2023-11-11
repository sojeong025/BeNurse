import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Common } from "../../../utils/global.styles";
import { IoChevronBackOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";

export default function NavBar({ onTempSave, onSave }) {
  const navigate = useNavigate();

  // 이전으로 가기
  const onPrevClick = () => {
    navigate(-1);
  };

  // 다음으로 가기
  // 1. 주소 설정
  const routeSequence = {
    "/off-application": "/off-application-write",
  };

  const onNext = () => {
    if (nextRoutes.includes(path)) {
      const nextPath = routeSequence[path];
      if (nextPath) {
        navigate(nextPath);
      } else {
        console.error(`다음 경로 정보가 없습니다: ${path}`);
      }
    }
  };

  // 왼쪽에 뒤로가기 필요하면 여기 넣기
  const backRoutes = [
    "/mypage",
    "/notice",
    "/notice/write",
    "/off-application",
    "/off-application-write",
    "/handover-write",
  ];

  // 알림버튼 필요하면 여기 넣기
  const bellRoutes = ["/main", "/handover"];
  // 다음 버튼 필요하면 여기 넣기
  const nextRoutes = ["/off-application"];
  // 임시저장 필요하면 여기 넣기
  const temSaveRoutes = ["/handover-write/"];

  const path = useLocation().pathname;
  const shouldDisplayBackIcon = backRoutes.some(
    (route) => path.startsWith(route) || /^\/patient\/\d+\/detail/.test(path),
  );
  const shouldDisplayNextIcon = nextRoutes.includes(path);
  const shouldDisplayTempSaveIcon = temSaveRoutes.some((route) =>
    path.startsWith(route),
  );
  const shouldDisplayBellIcon =
    !nextRoutes.includes(path) && bellRoutes.includes(path);
  const shouldDisplaySaveIcon = /^\/patient\/\d+\/detail\/?$/.test(path);

  const [visibility, setVisibility] = useState("flex");
  const [navTitle, setNavTitle] = useState("Be Nurse");
  const [navColor, setNavColor] = useState(Common.color.white01);
  const [navFontColor, setNavFontColor] = useState(Common.color.black03);
  const [navBoxShadow, setNavBoxShadow] = useState(
    "0px 4px 8px 0px rgba(213, 213, 213, 0.36) ",
  );

  useEffect(() => {
    if (path.startsWith("/schedule")) {
      setNavTitle("근무 일정");
      setNavColor(Common.color.purple03);
      setNavFontColor(Common.color.white01);
      setNavBoxShadow("");
      setVisibility("flex");
    } else if (
      path.startsWith("/login") ||
      path === "/off-application-finish" ||
      path === "/"
    ) {
      setVisibility("none");
    } else if (path.startsWith("/device")) {
      setNavTitle("장비 관리");
      setNavColor(Common.color.white01);
      setNavFontColor(Common.color.black03);
      setNavBoxShadow("0px 4px 8px 0px rgba(213, 213, 213, 0.36) ");
      setVisibility("flex");
    } else if (path.startsWith("/patient")) {
      if (/^\/patient\/\d+\/detail\/journal\/?$/.test(path)) {
        setNavTitle("간호 일지");
        setNavColor(Common.color.purple03);
        setNavFontColor(Common.color.white01);
        setNavBoxShadow("");
        setVisibility("flex");
      } else if (path === "/patient/detail") {
        setNavTitle("환자 상세 정보");
        setNavColor(Common.color.white01);
        setNavFontColor(Common.color.black03);
        setNavBoxShadow("0px 4px 8px 0px rgba(213, 213, 213, 0.36) ");
        setVisibility("flex");
      } else {
        setNavTitle("환자 관리");
        setNavColor(Common.color.white01);
        setNavFontColor(Common.color.black03);
        setNavBoxShadow("0px 4px 8px 0px rgba(213, 213, 213, 0.36) ");
        setVisibility("flex");
      }
    } else if (path === "/handover") {
      setNavTitle("인수인계");
      setNavColor(Common.color.white01);
      setNavFontColor(Common.color.black03);
      setNavBoxShadow("0px 4px 8px 0px rgba(213, 213, 213, 0.36) ");
      setVisibility("flex");
    } else if (path.startsWith("/handover-write")) {
      setNavTitle("인수인계 작성");
      setNavColor(Common.color.white01);
      setNavFontColor(Common.color.black03);
      setNavBoxShadow("0px 4px 8px 0px rgba(213, 213, 213, 0.36) ");
      setVisibility("flex");
    } else if (path.startsWith("/notice")) {
      setNavTitle("공지사항");
      setNavColor(Common.color.white01);
      setNavFontColor(Common.color.black03);
      setNavBoxShadow("0px 4px 8px 0px rgba(213, 213, 213, 0.36) ");
      setVisibility("flex");
    } else if (path.startsWith("/mypage")) {
      setNavTitle("마이페이지");
      setNavColor(Common.color.white01);
      setNavFontColor(Common.color.black03);
      setNavBoxShadow("0px 4px 8px 0px rgba(213, 213, 213, 0.36) ");
      setVisibility("flex");
    } else {
      setNavTitle("Be Nurse");
      setNavColor(Common.color.white01);
      setNavFontColor(Common.color.black03);
      setNavBoxShadow("0px 4px 8px 0px rgba(213, 213, 213, 0.36) ");
      setVisibility("flex");
    }
    if (path.startsWith("/admin")) {
      setVisibility("none");
    }
  }, [path]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        zIndex: 2,
        display: visibility,
        justifyContent: "space-between",
        alignItems: "flex-end",
        width: "412px",
        height: "74px",
        padding: "0px 0px 10px 0px",
        color: navFontColor,
        backgroundColor: navColor,
        boxShadow: navBoxShadow,
      }}
    >
      <div
        onClick={shouldDisplayBackIcon ? onPrevClick : null}
        style={{
          paddingLeft: "14px",
          display: "flex",
          alignItems: "cneter",
          width: "80px",
        }}
      >
        <IoChevronBackOutline
          size={20}
          style={{ visibility: shouldDisplayBackIcon ? "visible" : "hidden" }}
        />
      </div>

      <div
        style={{
          flex: 1,
          textAlign: "center",
          fontSize: Common.fontSize.fontM,
          fontWeight: Common.fontWeight.extrabold,
          letterSpacing: "1px",
        }}
      >
        {navTitle}
      </div>

      {shouldDisplayTempSaveIcon ? (
        <div
          onClick={onTempSave}
          style={{
            paddingRight: "14px",
            display: "flex",
            justifyContent: "end",
            width: "80px",
            fontSize: "16px",
            fontWeight: "bold",
            color: Common.color.purple03,
          }}
        >
          임시저장
        </div>
      ) : shouldDisplayNextIcon ? (
        <div
          onClick={onNext}
          style={{
            paddingRight: "14px",
            display: "flex",
            justifyContent: "end",
            width: "80px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "blue",
          }}
        >
          다음
        </div>
      ) : shouldDisplayBellIcon ? (
        <div
          style={{
            paddingRight: "14px",
            display: "flex",
            justifyContent: "end",
            width: "80px",
          }}
        >
          <GoBell size={20} />
        </div>
      ) : shouldDisplaySaveIcon ? (
        <div
          onClick={onSave}
          style={{
            paddingRight: "14px",
            display: "flex",
            justifyContent: "end",
            width: "80px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "blue",
          }}
        >
          저장
        </div>
      ) : (
        <div
          style={{
            paddingRight: "14px",
            display: "flex",
            justifyContent: "end",
            width: "80px",
          }}
        />
      )}
    </div>
  );
}
