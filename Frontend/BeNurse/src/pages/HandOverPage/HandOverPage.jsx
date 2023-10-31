import React from "react";
import Container from "@components/atoms/Container/Container";
import Box from "@components/atoms/Box/Box";
import { NavLink } from "react-router-dom";
import { NurseHeader } from "./HandOverPage.styles";

export default function HandOverPage() {
  return (
    <Container
      backgroundColor={"purple"}
      flex={["center", "flex-start"]}
    >
      <div
        style={{
          marginTop: "102px",
        }}
      >
        <NurseHeader>
          <Box
            type="purple03"
            size={["170px", "50px"]}
            border-radius="100%"
          >
            이전 사람
          </Box>
          <Box
            type="purple03"
            size={["170px", "50px"]}
            border-radius="100%"
          >
            다음 사람
          </Box>
        </NurseHeader>

        <div style={{ marginBottom: "20px" }}>
          <NavLink to="/handover-write">
            <Box
              type="purple03"
              size={["384px", "100px"]}
              font="20px"
              flex={["end", "center"]}
            >
              <span style={{ fontWeight: "bold" }}>새 인계장 작성하기</span>
            </Box>
          </NavLink>
        </div>
        <div style={{ marginBottom: "30px" }}>
          <Box
            type="purple02"
            size={["384px", "70px"]}
            flex={["space-between", "center"]}
          >
            <p>임시저장 불러오기</p>
            <p>3</p>
          </Box>
        </div>
        <Box
          type="white"
          size={["384px", "290px"]}
        >
          <div>
            <div>임시저장 목록들</div>
            <div>전체보기</div>
          </div>
        </Box>
      </div>
    </Container>
  );
}
