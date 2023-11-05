import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Common } from "../../../utils/global.styles";
import { IoChevronBackOutline } from "react-icons/io5"
import { GoBell } from "react-icons/go"

export default function NavBar() {
  const navigate = useNavigate();

  const onPrevClick = () => {
    navigate(-1);
  };

  // 왼쪽에 뒤로가기 필요하면 여기 넣기
  const backRoutes = ["/mypage", "/notice", "/device", "/patient"]
  const shouldDisplayBackIcon = backRoutes.includes(location.pathname)

  // 알림버튼 없애려면 여기 넣기
  const noNotice = ["/notice/write", "/schedule"]


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
      <div onClick={shouldDisplayBackIcon ? onPrevClick : null} style={{ paddingLeft: "14px", display: "flex", alignItems: "flex-end" }}>
        <IoChevronBackOutline size={20} style={{ visibility: shouldDisplayBackIcon ? 'visible' : 'hidden' }} />
      </div>

      <div
        style={{
          fontSize: Common.fontSize.fontM,
          fontWeight: Common.fontWeight.extrabold,
          letterSpacing: "1px",
        }}
      >
        {navTitle}
      </div>
      <div style={{paddingRight: "14px", display:"flex", alignItems:"flex-end"}}>
  <GoBell size={20} style={{ visibility: noNotice.includes(path) ? 'hidden' : 'visible' }} />
</div>

    </div>
  );
}
