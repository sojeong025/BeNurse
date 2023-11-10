import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";

// Icons
import schedule from "@assets/Icons/schedule.svg";
import handover from "@assets/Icons/handover.svg";
import main from "@assets/Icons/main.svg";
import patient from "@assets/Icons/patient.svg";
import device from "@assets/Icons/device.svg";
import schedule_fill from "@assets/Icons/schedule_fill.svg";
import handover_fill from "@assets/Icons/handover_fill.svg";
import main_fill from "@assets/Icons/main_fill.svg";
import patient_fill from "@assets/Icons/patient_fill.svg";
import device_fill from "@assets/Icons/device_fill.svg";

// emotion
import * as S from "./TabBar.styles";

import { useTabBarStore } from "../../../store/store";

export default function TabBar() {
  const [visibility, setVisibility] = useState("flex");
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { currentTab, setCurrentTab } = useTabBarStore((state) => state);

  const [colorTab, setColorTab] = useState("");

  useEffect(() => {
    if (
      path === "/" ||
      path.startsWith("/login") ||
      path === "/off-application" ||
      path === "/off-application-write" ||
      path === "/off-application-finish" ||
      path.startsWith("/handover-list/patients/detail") ||
      path.includes("/detail/journal")
    ) {
      setVisibility("none");
    } else {
      setVisibility("flex");
    }
    if (path.startsWith("/admin")) {
      setVisibility("none");
    }
    if (path.startsWith("/handover-write")) {
      setVisibility("none");
    }

    // TabBar icon color
    if (path.startsWith("/schedule")) {
      setColorTab("schedule");
    } else if (path.startsWith("/main")) {
      setColorTab("main");
    } else if (path.startsWith("/handover")) {
      setColorTab("handover");
    } else if (path.startsWith("/patient")) {
      setColorTab("patient");
    } else if (path.startsWith("/device")) {
      setColorTab("device");
    } else {
      setColorTab("");
    }
  }, [path]);

  return (
    <S.StyledTabBar display={visibility}>
      <S.styledTabBarIcon
        onClick={() => {
          navigate("/schedule");
        }}
      >
        <img
          src={colorTab == "schedule" ? schedule_fill : schedule}
          alt=""
        />
        <span
          style={
            colorTab == "schedule"
              ? { color: "#9669F9", fontWeight: "800" }
              : {}
          }
        >
          근무 일정
        </span>
      </S.styledTabBarIcon>
      <S.styledTabBarIcon
        onClick={() => {
          navigate("/handover");
        }}
      >
        <img
          src={colorTab == "handover" ? handover_fill : handover}
          alt=""
        />
        <span
          style={
            colorTab == "handover"
              ? { color: "#9669F9", fontWeight: "800" }
              : {}
          }
        >
          인수인계
        </span>
      </S.styledTabBarIcon>
      <S.styledTabBarIcon
        onClick={() => {
          navigate("/main");
        }}
      >
        <img
          src={colorTab == "main" ? main_fill : main}
          alt=""
        />
        <span
          style={
            colorTab == "main" ? { color: "#9669F9", fontWeight: "800" } : {}
          }
        >
          메인
        </span>
      </S.styledTabBarIcon>
      <S.styledTabBarIcon
        onClick={() => {
          navigate("/patient");
        }}
      >
        <img
          src={colorTab == "patient" ? patient_fill : patient}
          alt=""
        />
        <span
          style={
            colorTab == "patient" ? { color: "#9669F9", fontWeight: "800" } : {}
          }
        >
          환자 관리
        </span>
      </S.styledTabBarIcon>
      <S.styledTabBarIcon
        onClick={() => {
          navigate("/device");
        }}
      >
        <img
          src={colorTab == "device" ? device_fill : device}
          alt=""
        />
        <span
          style={
            colorTab == "device" ? { color: "#9669F9", fontWeight: "800" } : {}
          }
        >
          장비 관리
        </span>
      </S.styledTabBarIcon>
    </S.StyledTabBar>
  );
}
