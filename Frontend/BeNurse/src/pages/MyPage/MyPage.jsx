import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AiOutlineInfoCircle } from "react-icons/ai";
import { AiOutlinePhone } from "react-icons/ai";
import { MdSettings } from "react-icons/md";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

import Container from "@components/atoms/Container/Container";
import Modal from "@components/atoms/Modal/Modal";
import Button from "@components/atoms/Button/Button";

import { customAxios } from "../../libs/axios";

import * as S from "./MyPage.styles";
import change_hospital from "@assets/Images/change_hospital.png";
import nurse_woman from "@assets/Images/nurse_woman.png";
import warning from "@assets/Images/warning.png";

export default function MyPage() {
  const navigate = useNavigate();

  const [myInfo, setMyInfo] = useState({});

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalItem, setModalItem] = useState({
    msg: "",
    button: "",
    onClick: "",
  });

  const handleOpenModal = (event, type) => {
    event.preventDefault();
    const change_hospital = {
      msg: (
        <div>
          병원 정보를 변경하기 위해서 <br /> 새로 발급받은 인증코드가
          필요합니다. <br />
          계속하시겠습니까 ?
        </div>
      ),
      button: "변경하기",
      onClick: () => {
        navigate("/login/joinNurse");
      },
    };
    const leave_hospital = {
      msg: (
        <div>
          탈퇴 후 재가입을 위해서 <br />
          병원 측 인증코드 재발급이 필요합니다. <br />
          계속 하시겠습니까?
        </div>
      ),
      button: "탈퇴하기",
      onClick: () => {
        customAxios
          .delete("nurse", { id: localStorage.getItem("nurseID") })
          .then((res) => {})
          .catch((error) => {
            console.error("간호사 탈퇴 실패:", error);
          });
        navigate("/login");
      },
    };
    setModalIsOpen(true);
    if (type == "change_hospital") {
      setModalItem(change_hospital);
    } else if (type == "leave_hospital") {
      setModalItem(leave_hospital);
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setModalItem({
      msg: "",
      button: "",
      onClick: () => {},
    });
  };

  const handleChangeHospitalBtn = () => {};

  useEffect(() => {
    customAxios
      .get("nurse/me")
      .then((res) => {
        setMyInfo(res.data.responseData);
      })
      .catch((error) => {
        console.error("내 정보 로드 실패:", error);
      });
  }, []);

  return (
    <Container>
      <S.MainContainer>
        <S.TopContainer>
          <div className="top-container-inner">
            <img
              className="profile_image"
              src={nurse_woman}
            />
            <p className="profile_name">{myInfo.name}</p>
            <div className="profile_workplace">
              <span className="profile_hospital">{myInfo.hospitalName}</span>
              <span className="profile_ward">{myInfo.wardName}</span>
            </div>
          </div>
        </S.TopContainer>
        <div>
          <div onClick={(e) => handleOpenModal(e, "change_hospital")}>
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
          </div>
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
          <S.MyPageAuthBtn
            onClick={() => {
              localStorage.removeItem("accessToken");
              navigate("/login");
            }}
          >
            로그아웃
          </S.MyPageAuthBtn>
          <S.MyPageAuthBtn
            onClick={(e) => {
              handleOpenModal(e, "leave_hospital");
            }}
          >
            회원탈퇴
          </S.MyPageAuthBtn>
        </S.BtnContainer>
      </S.MainContainer>
      <Modal
        visible={modalIsOpen}
        closable={false}
        maskClosable={true}
        onClose={handleCloseModal}
        width="300px"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            overflowX: "hidden",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              maxHeight: "600px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <img
              src={warning}
              style={{ width: "60px" }}
              alt=""
            />
            <div
              style={{
                textAlign: "center",
                lineHeight: "20px",
                fontSize: "14px",
              }}
            >
              {modalItem.msg}
            </div>
            <Button
              variant="danger"
              width="100px"
              height="40px"
              onClick={modalItem.onClick}
            >
              {modalItem.button}
            </Button>
          </div>
        </div>
      </Modal>
    </Container>
  );
}
