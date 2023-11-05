import React, { useState } from "react";

import { TbBulb } from "react-icons/tb";
import Modal from "../../components/atoms/Modal/Modal";
import nurse_tip_01 from "@assets/Images/BeNurse_tips/nurse_tip_01.png";
import nurse_tip_02 from "@assets/Images/BeNurse_tips/nurse_tip_02.png";
import nurse_tip_03 from "@assets/Images/BeNurse_tips/nurse_tip_03.png";
import nurse_tip_04 from "@assets/Images/BeNurse_tips/nurse_tip_04.png";
import nurse_tip_05 from "@assets/Images/BeNurse_tips/nurse_tip_05.png";
import nurse_tip_06 from "@assets/Images/BeNurse_tips/nurse_tip_06.png";
import nurse_tip_07 from "@assets/Images/BeNurse_tips/nurse_tip_07.png";
import nurse_tip_08 from "@assets/Images/BeNurse_tips/nurse_tip_08.png";
import nurse_tip_09 from "@assets/Images/BeNurse_tips/nurse_tip_09.png";
import Box from "../../components/atoms/Box/Box";
import * as S from "./MainPage.styles";

export default function NurseTip() {
  const tips = [
    {
      subTitle: "호흡기 간호 입문",
      title: "수액 속도",
      imgSrc: nurse_tip_01,
    },
    {
      subTitle: "호흡기 간호 입문",
      title: "채혈 부위",
      imgSrc: nurse_tip_02,
    },
    {
      subTitle: "아동 간호",
      title: "채혈 bottle 종류와 설명",
      imgSrc: nurse_tip_03,
    },
    {
      subTitle: "감염환자 간호",
      title: "검체 담는 순서",
      imgSrc: nurse_tip_04,
    },
    {
      subTitle: "호흡기 간호 입문",
      title: "ABGA 간단 해석",
      imgSrc: nurse_tip_05,
    },
    {
      subTitle: "혈액종양내과 입문",
      title: "수혈의 종류",
      imgSrc: nurse_tip_06,
    },
    {
      subTitle: "혈액종양내과 입문",
      title: "CT와 MRI",
      imgSrc: nurse_tip_07,
    },
    {
      subTitle: "간호 입문",
      title: "인계장 예시",
      imgSrc: nurse_tip_08,
    },
    {
      subTitle: "간호 입문",
      title: "환자 파악 예시",
      imgSrc: nurse_tip_09,
    },
  ];

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const handleTipBoxClick = (event, id) => {
    event.preventDefault();
    setModalIsOpen(true);
    setModalContent(tips[id - 1]);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setModalContent({});
  };

  return (
    <S.TipBoxContainer>
      {tips.map((tip, i) => (
        <Box
          key={i}
          type="white"
          size={["160px", "120px"]}
        >
          <S.TipBox onClick={(e) => handleTipBoxClick(e, i + 1)}>
            <TbBulb />
            <div>
              <p className="title">{tip.title}</p>
              <p className="desc">{tip.subTitle}</p>
            </div>
          </S.TipBox>
        </Box>
      ))}
      <Modal
        visible={modalIsOpen}
        closable={false}
        maskClosable={true}
        onClose={handleCloseModal}
        width="370px"
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
          <div style={{ maxHeight: "600px", overflowY: "auto" }}>
            <img
              width="100%"
              src={modalContent.imgSrc}
              alt=""
            />
          </div>
        </div>
      </Modal>
    </S.TipBoxContainer>
  );
}
