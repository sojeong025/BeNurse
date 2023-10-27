import React from "react";
import { NavLink } from "react-router-dom";
import Container from "../../components/atoms/Container/Container";
import LogoPurple from "@assets/Images/logo_purple.svg";
import KaKaoLoginBtn from "@assets/Images/kakao_login_btn.png";

import * as S from "./KakaoLoginPage.styles";

export default function KakaoLoginPage() {
  return (
    <Container>
      <S.MainContainer>
        <img
          src={LogoPurple}
          alt="Be Nurse"
        />
        <NavLink to="join">
          <img src={KaKaoLoginBtn} />
        </NavLink>
      </S.MainContainer>
    </Container>
  );
}
