import React from "react";
import Container from "@components/atoms/Container/Container";
import { Common } from "../../utils/global.styles";
import Button from "../../components/atoms/Button/Button";
import { NavLink } from "react-router-dom";

import send from "@assets/Images/send.png";

export default function OffFinishPage() {
  return (
    <Container
      backgroundColor={"white"}
      flex={["center", "center"]}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={send}
          style={{
            width: "120px",
            height: "120px",
            marginBottom: "50px",
          }}
          alt=""
        />
        <div
          style={{
            fontSize: Common.fontSize.fontXXL,
            fontWeight: Common.fontWeight.black,
            marginBottom: "20px",
          }}
        >
          오프 신청 완료
        </div>
        <div
          style={{
            marginBottom: "40px",
            textAlign: "center",
            lineHeight: "24px",
          }}
        >
          오프 신청이 완료되었습니다. <br />
          신청 결과는 알림을 통해 알려드리겠습니다.
        </div>
        <NavLink to="/schedule">
          <Button
            variant="primary"
            width="180px"
            radius="16px"
          >
            확인
          </Button>
        </NavLink>
      </div>
    </Container>
  );
}
