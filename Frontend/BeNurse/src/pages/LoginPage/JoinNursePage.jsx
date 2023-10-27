import React, { useState } from "react";
import * as S from "./JoinNursePage.styles";
import { Common } from "@utils/global.styles.jsx";
import { useNavigate } from "react-router-dom";
import { css, keyframes } from "@emotion/react";

import Container from "../../components/atoms/Container/Container";
import Button from "../../components/atoms/Button/Button";
import OtpInput from "react18-input-otp";

import join_verify from "@assets/Images/join_verify.png";

export default function JoinNursePage() {
  const [otp, setOtp] = useState("");
  const [hasErrored, setHasErrored] = useState(false);
  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
    setHasErrored(false);
  };

  const navigate = useNavigate();

  const onClickCheckBtn = () => {
    if (otp === "12345678") {
      navigate("/");
    } else {
      setHasErrored(true);
    }
  };

  return (
    <Container backgroundColor="purple">
      <S.MainContainer>
        <img
          src={join_verify}
          width="250px"
        />
        <div>
          <S.TitleText>BeNurse 간호사 등록</S.TitleText>
          <S.DescText>관리자에게 전달받은 등록 코드를 입력해주세요.</S.DescText>
        </div>

        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={8}
          separator={<div style={{ marginLeft: "6px" }}>-</div>}
          separateAfter={4}
          containerStyle={{
            gap: "6px",
          }}
          inputStyle={{
            height: "50px",
            width: "35px",
            fontSize: `${Common.fontSize.fontXXL}`,
            fontWeight: `${Common.fontWeight.extrabold}`,
            border: "none",
            borderRadius: "8px",
            boxSizing: "border-box",
            color: `${Common.color.black01}`,
          }}
          errorStyle={{
            border: `2px solid ${Common.color.danger}`,
          }}
          isInputSecure={true}
          hasErrored={hasErrored}
        />
        <Button
          margin="20px 0"
          variant="primary"
          width="350px"
          radius="10px"
          onClick={onClickCheckBtn}
        >
          확인
        </Button>
      </S.MainContainer>
    </Container>
  );
}
