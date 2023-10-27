import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Common } from "../../../utils/global.styles";

export default function NavBar() {
  const [visibility, setVisibility] = useState("flex");
  const [navTitle, setNavTitle] = useState("Be Nurse");
  const [navColor, setNavColor] = useState(Common.color.white01);
  const [navFontColor, setNavFontColor] = useState(Common.color.black03);
  const path = useLocation().pathname;

  useEffect(() => {
    if (path.startsWith("/schedule")) {
      setNavTitle("근무 관리");
      setNavColor(Common.color.purple03);
      setNavFontColor(Common.color.white01);
      setVisibility("flex");
    } else if (path.startsWith("/login")) {
      setVisibility("none");
    } else if (path.startsWith("/device")) {
      setNavTitle("장비 관리");
      setNavColor(Common.color.white01);
      setNavFontColor(Common.color.black03);
      setVisibility("flex");
    } else if (path.startsWith("/patient")) {
      setNavTitle("환자 관리");
      setNavColor(Common.color.white01);
      setNavFontColor(Common.color.black03);
      setVisibility("flex");
    } else if (path.startsWith("/handover")) {
      setNavTitle("인수인계");
      setNavColor(Common.color.white01);
      setNavFontColor(Common.color.black03);
      setVisibility("flex");
    } else if (path.startsWith("/notice")) {
      setNavTitle("공지사항");
      setNavColor(Common.color.white01);
      setNavFontColor(Common.color.black03);
      setVisibility("flex");
    } else if (path.startsWith("/mypage")) {
      setNavTitle("마이페이지");
      setNavColor(Common.color.white01);
      setNavFontColor(Common.color.black03);
      setVisibility("flex");
    } else {
      setNavTitle("Be Nurse");
      setNavColor(Common.color.white01);
      setNavFontColor(Common.color.black03);
      setVisibility("flex");
    }
  }, [path]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        zIndex: 9999,
        display: visibility,
        justifyContent: "center",
        alignItems: "flex-end",
        width: "412px",
        height: "64px",
        padding: "0px 0px 10px 0px",
        color: navFontColor,
        backgroundColor: navColor,
      }}
    >
      <span>{navTitle}</span>
    </div>
  );
}
