import React from "react";
import { Link } from "react-router-dom";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import Container from "../../components/atoms/Container/Container";

import * as S from "./JoinPage.styles";
import join_hospital from "@assets/Images/join_hospital.png";
import join_nurse from "@assets/Images/join_nurse.png";

export default function JoinPage() {
  return (
    <Container backgroundColor="purple">
      <S.MainContainer>
        <S.ButtonContainer>
          <S.MainButton variant="hospital">
            <S.FlexContainer>
              <img
                src={join_hospital}
                width="100px"
              />
              <div>
                <S.buttonDesc variant="hospital">
                  병원을 등록하려는 관리자이신가요?
                </S.buttonDesc>
                <S.buttonTitle>
                  <BsFillArrowRightCircleFill />
                  병원 등록하기
                </S.buttonTitle>
              </div>
            </S.FlexContainer>
          </S.MainButton>

          <Link to={"../joinNurse"}>
            <S.MainButton variant="nurse">
              <S.FlexContainer>
                <img
                  src={join_nurse}
                  width="100px"
                />
                <div>
                  <S.buttonDesc variant="nurse">
                    이미 등록된 병원의 간호사이신가요?
                  </S.buttonDesc>
                  <S.buttonTitle>
                    <BsFillArrowRightCircleFill />
                    간호사로 가입하기
                  </S.buttonTitle>
                </div>
              </S.FlexContainer>
            </S.MainButton>
          </Link>
        </S.ButtonContainer>
      </S.MainContainer>
    </Container>
  );
}
