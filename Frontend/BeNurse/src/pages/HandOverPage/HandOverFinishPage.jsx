import React from "react";
import Container from "@components/atoms/Container/Container";
import { Common } from "../../utils/global.styles";
import Button from "../../components/atoms/Button/Button";
import { NavLink } from "react-router-dom";

import handover_finish from "@assets/Images/handover_finish.png";

export default function HandOverFinishPage() {
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
          src={handover_finish}
          style={{
            width: "240px",
            height: "240px",
            marginBottom: "50px",
          }}
          alt=""
        />
        <div
          style={{
            color: Common.color.black03,
            fontSize: Common.fontSize.fontL,
            fontWeight: Common.fontWeight.black,
            marginBottom: "20px",
          }}
        >
          인계장 전송 완료!
        </div>
        <div
          style={{
            color: Common.color.black02,
            fontSize: Common.fontSize.fontM,
            marginBottom: "40px",
            textAlign: "center",
            lineHeight: "24px",
          }}
        >
          인계장 전송이 완료되었습니다. <br />
          보낸 인계장에서 내용을 확인할 수 있습니다.
        </div>
        <NavLink to="/handover">
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
