import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Common } from "../../../utils/global.styles";

export default function NavBar() {
  const [visibility, setVisibility] = useState("flex");
  const [navTitle, setNavTitle] = useState("Be Nurse");
  const [navColor, setNavColor] = useState(Common.color.white01);
  const [navFontColor, setNavFontColor] = useState(Common.color.black03);
  const [navBoxShadow, setNavBoxShadow] = useState(
    "0px 4px 8px 0px rgba(213, 213, 213, 0.36) ",
  );
  const path = useLocation().pathname;

  useEffect(() => {
    if (path.startsWith("/schedule")) {
      setNavTitle("근무 관리");
      setNavColor(Common.color.purple03);
      setNavFontColor(Common.color.white01);
      setNavBoxShadow("");
      setVisibility("flex");
    } else if (
      path.startsWith("/login") ||
      path === "/off-application-finish"
    ) {
      setVisibility("none");
    } else if (path.startsWith("/device")) {
      setNavTitle("장비 관리");
      setNavColor(Common.color.white01);
      setNavFontColor(Common.color.black03);
      setNavBoxShadow("0px 4px 8px 0px rgba(213, 213, 213, 0.36) ");
      setVisibility("flex");
    } else if (path.startsWith("/patient")) {
      if (path === "/patient/detail/journal") {
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
    } else if (path.startsWith("/handover")) {
      setNavTitle("인수인계");
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
  }, [path]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        zIndex: 2,
        display: visibility,
        justifyContent: "center",
        alignItems: "flex-end",
        width: "412px",
        height: "64px",
        padding: "0px 0px 10px 0px",
        color: navFontColor,
        backgroundColor: navColor,
        boxShadow: navBoxShadow,
      }}
    >
      <span
        style={{
          fontSize: Common.fontSize.fontL,
          fontWeight: Common.fontWeight.extrabold,
        }}
      >
        {navTitle}
      </span>
    </div>
  );
}
