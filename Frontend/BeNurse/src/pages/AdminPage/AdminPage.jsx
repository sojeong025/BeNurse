import React, { useEffect, useState } from "react";
import { Common } from "../../utils/global.styles";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Logo_white from "@assets/Images/logo_white.svg";

export default function AdminPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    document
      .querySelector("body")
      .setAttribute("style", "width: 100vw; height: 100vh;");
    if (isLogin) {
      navigate("signup");
    } else {
      navigate("role");
    }
  }, []);
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0px 60px",
          height: "60px",
          backgroundColor: Common.color.purple03,
        }}
      >
        <img
          style={{ height: "34px" }}
          src={Logo_white}
          alt=""
        />
      </div>
      <Outlet />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 60px",
          height: "50px",
          fontSize: Common.fontSize.fontXS,
          color: "#999999",
          backgroundColor: Common.color.black03,
        }}
      >
        <p>@ Fornurse Corp</p>
        <p>@ Samsung Software Academy For Youth</p>
      </div>
    </div>
  );
}
