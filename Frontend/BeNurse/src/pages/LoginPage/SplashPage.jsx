import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        navigate("/main");
      } else {
        navigate("/login");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return <div>신규회원이면 로그인 아니면 체크하고 메인</div>;
}
