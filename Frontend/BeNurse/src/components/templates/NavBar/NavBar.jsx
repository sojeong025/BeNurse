import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Common } from "../../../utils/global.styles";

export default function NavBar() {
  const [navColor, setNavColor] = useState(Common.color.white01);
  const [navFontColor, setNavFontColor] = useState(Common.color.black03);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/schedule") {
      setNavColor(Common.color.purple03);
      setNavFontColor(Common.color.white01);
    } else {
      setNavColor(Common.color.white01);
      setNavFontColor(Common.color.black03);
    }
  }, [location]);
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        width: "412px",
        height: "64px",
        padding: "0px 0px 10px 0px",
        color: navFontColor,
        backgroundColor: navColor,
      }}
    >
      <span>장비 관리</span>
    </div>
  );
}
