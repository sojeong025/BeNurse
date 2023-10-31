import React from "react";
import Container from "@components/atoms/Container/Container";
import Box from "../../components/atoms/Box/Box";

export default function HandOverWritePage() {
  return (
    <Container backgroundColor={"purple"}>
      <div style={{ marginTop: "102px" }}>
        <div style={{ marginBottom: "20px" }}>인계장 기본 정보 입력</div>
        <Box
          type="white"
          size={["384px", "96px"]}
        >
          <div>
            <p>인계 날짜</p>
            <p>언제다</p>
          </div>
        </Box>
      </div>
    </Container>
  );
}
