import React from "react";
import Container from "../../components/atoms/Container/Container";
import LogoPurple from "@assets/Images/logo_purple.svg";
import KaKaoLoginBtn from "@assets/Images/kakao_login_btn.png";
import { AuthenticationService } from "../AdminPage/AuthenticationService";

import * as S from "./KakaoLoginPage.styles";

export default function KakaoLoginPage() {
  const handleLogin = () => {
    localStorage.setItem("preLoginpath", window.location.pathname);
    AuthenticationService.loginSocialKakao();
  };
  return (
    <Container>
      <S.MainContainer>
        <img
          src={LogoPurple}
          alt="Be Nurse"
        />
        <img
          src={KaKaoLoginBtn}
          onClick={handleLogin}
        />
      </S.MainContainer>
    </Container>
  );
}
