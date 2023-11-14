import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Common } from "../../utils/global.styles";
import { StyledStar, StyledLogo } from "./SplashPage.styles";
import logo_text from "@assets/Images/logo_text.svg";
import logo_star from "@assets/Images/logo_star.svg";

export default function SplashPage() {
  const navigate = useNavigate();
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFade(true);
    }, 2600);
    const timer = setTimeout(() => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        navigate("/main");
      } else {
        navigate("/login");
      }
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        height: "100vh",
        opacity: fade ? "0" : "1",
        transition: "all 1s ease-in-out",
        backgroundColor: Common.color.purple03,
      }}
    >
      <StyledLogo
        src={logo_text}
        alt=""
      />
      <StyledStar
        src={logo_star}
        alt=""
      />
    </div>
  );
}
