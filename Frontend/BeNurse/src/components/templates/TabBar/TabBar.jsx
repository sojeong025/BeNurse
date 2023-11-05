import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";

// Icons
import schedule from "@assets/Icons/schedule.svg";
import handover from "@assets/Icons/handover.svg";
import main from "@assets/Icons/main.svg";
import patient from "@assets/Icons/patient.svg";
import device from "@assets/Icons/device.svg";

// emotion
import * as S from "./TabBar.styles";

export default function TabBar() {
  const [visibility, setVisibility] = useState("flex");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    if (
      location.pathname === "/" ||
      location.pathname.startsWith("/login") ||
      location.pathname === "/off-application" ||
      location.pathname === "/off-application-finish" ||
      location.pathname.startsWith("/handover-list/patients/detail")
    ) {
      setVisibility("none");
    } else {
      setVisibility("flex");
    }
    if (location.pathname.startsWith("/admin")) {
      setVisibility("none");
    }
    if (location.pathname.startsWith("/handover-write/patients")) {
      setVisibility("none");
    }
  }, [location]);

  return (
    <S.StyledTabBar display={visibility}>
      <S.styledTabBarIcon
        onClick={() => {
          navigate("/schedule");
        }}
      >
        <img
          src={schedule}
          alt=""
        />
        <span>근무 관리</span>
      </S.styledTabBarIcon>
      <S.styledTabBarIcon
        onClick={() => {
          navigate("/handover");
        }}
      >
        <img
          src={handover}
          alt=""
        />
        <span>인수인계</span>
      </S.styledTabBarIcon>
      <S.styledTabBarIcon
        onClick={() => {
          navigate("/main");
        }}
      >
        <img
          src={main}
          alt=""
        />
        <span>메인</span>
      </S.styledTabBarIcon>
      <S.styledTabBarIcon
        onClick={() => {
          navigate("/patient");
        }}
      >
        <img
          src={patient}
          alt=""
        />
        <span>환자 관리</span>
      </S.styledTabBarIcon>
      <S.styledTabBarIcon
        onClick={() => {
          navigate("/device");
        }}
      >
        <img
          src={device}
          alt=""
        />
        <span>장비 관리</span>
      </S.styledTabBarIcon>
    </S.StyledTabBar>
  );
}
