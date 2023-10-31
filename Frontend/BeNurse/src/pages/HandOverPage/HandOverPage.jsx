import React from "react";
import Container from "@components/atoms/Container/Container";
import Box from "../../components/atoms/Box/Box";
import { NavLink } from "react-router-dom";

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "60px",
          }}
        >
          <Box
            type="purple03"
            size={["170px", "50px"]}
            border-radius="100%"
          >
            일단 사람
          </Box>
          <Box
            type="purple03"
            size={["170px", "50px"]}
            border-radius="100%"
          >
            일단 사람
          </Box>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <NavLink to="/handover-write">
            <Box
              type="purple03"
              size={["384px", "100px"]}
            >
              새 인계장 작성하기
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
        <div>
          <Box
            type="white"
            size={["384px", "290px"]}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <p>임시저장 목록들</p>
          </Box>
        </div>
      </div>
    </Container>
  );
}
