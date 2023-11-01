import React from "react";
import Container from "@components/atoms/Container/Container";
import Box from "@components/atoms/Box/Box";
import { NavLink } from "react-router-dom";
import { NurseHeader } from "./HandOverPage.styles";
import write from "@assets/Images/write.png";
import nurse from "@assets/Images/nurse.png";
import { Common } from "@utils/global.styles.jsx";

export default function HandOverPage() {
  return (
    <Container
      backgroundColor={"purple"}
      flex={["center", "flex-start"]}
    >
      <div
        style={{
          marginTop: "84px",
          paddingTop: "14px",
        }}
      >
        <NurseHeader>
          <Box
            type="purple03"
            size={["170px", "50px"]}
            flex={["space-evenly", "center"]}
            border-radius="100%"
            font="11px"
          >
            <img
              className=".nurse-image"
              src={nurse}
            />
            <div>
              <p>DAY PART</p>
              <p>정은경 간호사</p>
            </div>
          </Box>
          <Box
            type="purple03"
            size={["170px", "50px"]}
            border-radius="100%"
            flex={["space-evenly", "center"]}
          >
            다음 사람
            <img
              src={nurse}
              style={{ width: "52px" }}
            />
          </Box>
        </NurseHeader>

        <div style={{ marginBottom: "20px" }}>
          <NavLink to="/handover-write">
            <Box
              type="purple03"
              size={["384px", "100px"]}
              font="18px"
              flex={["space-around", "center"]}
            >
              <img
                src={write}
                alt=""
                style={{ width: "200px" }}
              />
              <span style={{ fontWeight: "bold", marginRight: "30px" }}>
                새 인계장 작성하기
              </span>
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

        <NavLink to="/handover-list">
          <Box
            type="white"
            size={["384px", "290px"]}
          >
            <div>
              <div>인계장 목록들</div>
              <div>전체보기</div>
            </div>
          </Box>
        </NavLink>
      </div>
    </Container>
  );
}
