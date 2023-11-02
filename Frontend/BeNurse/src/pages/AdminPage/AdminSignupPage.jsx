import React from "react";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import KAKAO from "@assets/Images/web_kakao_login.png";

export default function AdminSignupPage() {
  const login = () => {
    window.location.href =
      "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=b0fd97eee94cd828a98545a4293a321f&redirect_uri=http://k9e105.p.ssafy.io:9000/api/benurse/oauth";
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        height: "calc(100vh - 60px)",
      }}
    >
      <p style={{ fontSize: "50px", fontWeight: 800 }}>Be Nurse</p>
      <img
        onClick={login}
        src={KAKAO}
        style={{ cursor: "pointer", width: "460px", marginTop: "20px" }}
        alt=""
      />
    </div>
  );
}
