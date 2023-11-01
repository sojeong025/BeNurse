import React from "react";
import Container from "@components/atoms/Container/Container";
import Box from "@components/atoms/Box/Box";
import { NavLink } from "react-router-dom";
import { NurseHeader, TemporaryBox, HandoverList } from "./HandOverPage.styles";
import write from "@assets/Images/write.png";
import nurse from "@assets/Images/nurse.png";
import item from "@assets/Icons/handoveritem.svg";
import { MdKeyboardArrowRight } from "react-icons/md";

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
            flex={["center", "center"]}
            props={"border-radius: 100px"}
          >
            <img
              className="nurse-image"
              src={nurse}
            />
            <div className="nurse-info">
              <h5>DAY PART</h5>
              <p>내과 5동 정은경</p>
            </div>
          </Box>
          <Box
            type="purple03"
            size={["170px", "50px"]}
            border-radius="100%"
            flex={["center", "center"]}
            props={"border-radius: 100px"}
          >
            <div className="nurse-info">
              <h5 style={{ textAlign: "end" }}>NIGHT PART</h5>
              <p>내과 5동 정은경</p>
            </div>
            <img
              className="nurse-image"
              src={nurse}
            />
          </Box>
        </NurseHeader>

        {/* 새 인계장 작성 박스 */}
        <div style={{ marginBottom: "20px" }}>
          <NavLink to="/handover-write">
            <Box
              type="purple03"
              size={["384px", "100px"]}
              font="18px"
              flex={["end", "center"]}
              position="relative"
            >
              <img
                src={write}
                alt=""
                style={{
                  width: "200px",
                  position: "absolute",
                  left: "3%",
                  top: "16%",
                }}
              />
              <span style={{ fontWeight: "bold", marginRight: "36px" }}>
                새 인계장 작성하기
              </span>
            </Box>
          </NavLink>
        </div>

        {/* 임시저장 박스 */}
        <TemporaryBox>
          <NavLink to="/temporary-list">
            <Box
              type="purple02"
              size={["384px", "70px"]}
              flex={["space-around", "center"]}
            >
              <div>
                <p style={{ color: "#555555" }}>임시저장 불러오기</p>
              </div>
              <div className="right">
                <div className="list-count">3</div>
                <div className="arrow">
                  <MdKeyboardArrowRight />
                </div>
              </div>
            </Box>
          </NavLink>
        </TemporaryBox>

        {/* 받은 인계장 보관함 */}
        <HandoverList>
          <Box
            type="white"
            size={["384px", "326px"]}
            props={"flex-direction:column"}
            flex={["start"]}
          >
            <div className="temporary-container">
              <div className="handover-header">
                <h2>받은 인계장 보관함</h2>
                <NavLink to="/handover-list">
                  <h5>
                    전체보기 <MdKeyboardArrowRight />
                  </h5>
                </NavLink>
              </div>

              <div>
                <img
                  src={item}
                  alt=""
                />
              </div>
            </div>
          </Box>
        </HandoverList>
      </div>
    </Container>
  );
}
