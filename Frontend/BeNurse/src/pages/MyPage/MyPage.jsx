import React from "react";
import { Link } from "react-router-dom";

import { AiOutlineInfoCircle } from "react-icons/ai";
import { AiOutlinePhone } from "react-icons/ai";
import { MdSettings } from "react-icons/md";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

import Container from "../../components/atoms/Container/Container";

import * as S from "./MyPage.styles";
import change_hospital from "@assets/Images/change_hospital.png";
import patient_temp from "@assets/Images/patient_temp.png";

export default function MyPage() {
  return (
    <Container>
      <S.MainContainer>
        <S.TopContainer>
          <div className="top-container-inner">
            <img
              className="profile_image"
              src={patient_temp}
            />
            <p className="profile_name">정소정</p>
            <div className="profile_workplace">
              <span className="profile_hospital">갑을녹산병원</span>
              <span className="profile_ward">내과 5동</span>
            </div>
          </div>
        </S.TopContainer>
        <div>
          <Link>
            <S.ChangeHospitalBtn>
              <img
                src={change_hospital}
                width="80px"
              />
              <div>
                <p>병원 변경하기</p>
                <p>이직하셨나요? 병원을 재등록 해주세요.</p>
              </div>
              <div 
                className="arrow-chip"
                style={{
                  background: "#D0BFFF",
                  display: "flex",
                  borderRadius: "50%",
                  color: "#6647D6",
                  marginRight: "20px",
                }}
              >
                <MdKeyboardArrowRight />
              </div>
            </S.ChangeHospitalBtn>
          </Link>
        </div>
        <S.MyPageList>
          <Link>
            <div>
              <MdSettings />
              <p>앱 설정</p>
            </div>
            <MdKeyboardArrowRight />
          </Link>
        </S.MyPageList>
        <S.MyPageList>
          <Link>
            <div>
              <AiOutlineInfoCircle />
              <p>이용약관</p>
            </div>
            <MdKeyboardArrowRight />
          </Link>
        </S.MyPageList>
        <S.MyPageList>
          <Link>
            <div>
              <AiOutlinePhone />
              <p>문의하기</p>
            </div>
            <MdKeyboardArrowRight />
          </Link>
        </S.MyPageList>
        <S.MyPageList>
          <Link>
            <div>
              <MdOutlinePrivacyTip />
              <p>개인정보 처리방침</p>
            </div>
            <MdKeyboardArrowRight />
          </Link>
        </S.MyPageList>
        <S.BtnContainer>
          <S.MyPageAuthBtn>로그아웃</S.MyPageAuthBtn>
          <S.MyPageAuthBtn>회원탈퇴</S.MyPageAuthBtn>
        </S.BtnContainer>
      </S.MainContainer>
    </Container>
  );
}
