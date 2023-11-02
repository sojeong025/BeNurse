import React from "react";
import Container from "@components/atoms/Container/Container";
import Box from "@components/atoms/Box/Box";
import { NavLink } from "react-router-dom";
import { WorkPart, TemporaryBox, HandoverList } from "./HandOverPage.styles";
import write from "@assets/Images/write.png";
import nurse from "@assets/Images/nurse.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import HandOverListItem from "@components/templates/HandOver/HandOverListItem";

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
        <WorkPart>
          <div className="title">근무 파트</div>
          <div className="nurse-list">
            <Box
              type="white"
              size={["120px", "50px"]}
              flex={["space-around", "center"]}
            >
              <div className="nurse-info">
                <h5>이전 파트</h5>
                <p>정은경 간호사</p>
              </div>
              <img
                className="nurse-image"
                src={nurse}
              />
            </Box>
            <Box
              type="purple02"
              size={["120px", "50px"]}
              flex={["space-around", "center"]}
              // props={"border:1px solid #555555"}
            >
              <div className="nurse-info">
                <h5>현재 파트</h5>
                <p>정소정 간호사</p>
              </div>
              <img
                className="nurse-image"
                src={nurse}
              />
            </Box>
            <Box
              type="white"
              size={["120px", "50px"]}
              flex={["space-around", "center"]}
            >
              <div className="nurse-info">
                <h5>다음 파트</h5>
                <p>김대웅 간호사</p>
              </div>
              <img
                className="nurse-image"
                src={nurse}
              />
            </Box>
          </div>

          {/* 새 인계장 작성 박스 */}
          <div style={{ marginBottom: "10px" }}>
            <div className="title">인계장 작성</div>
            <NavLink to="/handover-write">
              <Box
                type="purple03"
                size={["384px", "100px"]}
                font="18px"
                flex={["start", "center"]}
                position="relative"
              >
                <img
                  src={write}
                  alt=""
                  style={{
                    width: "200px",
                    position: "absolute",
                    left: "48%",
                    top: "20%",
                  }}
                />
                <span style={{ fontWeight: "bold", marginLeft: "36px" }}>
                  새 인계장 작성하기
                </span>
              </Box>
            </NavLink>
          </div>
        </WorkPart>

        {/* 임시저장 박스 */}
        <TemporaryBox>
          <NavLink to="/temporary-list">
            <Box
              type="white"
              size={["384px", "60px"]}
              flex={["start", "center"]}
            >
              <div className="temporary-box">
                <p className="temporary-title">임시저장 불러오기</p>
                <div className="right">
                  <p className="list-count">3</p>
                  <p className="arrow">
                    <MdKeyboardArrowRight />
                  </p>
                </div>
              </div>
            </Box>
          </NavLink>
        </TemporaryBox>

        {/* 받은 인계장 보관함 */}
        <HandoverList>
          <div className="handover-header">
            <div className="title">최근 받은 인계장</div>
            <NavLink to="/handover-list">
              <h5>
                전체보기 <MdKeyboardArrowRight />
              </h5>
            </NavLink>
          </div>
          <Box
            type="white"
            size={["384px", "294px"]}
            props={"flex-direction:column"}
            flex={["start"]}
          >
            <div className="temporary-container">
              <div>
                <HandOverListItem />
                <HandOverListItem />
                <HandOverListItem />
              </div>
            </div>
          </Box>
        </HandoverList>
      </div>
    </Container>
  );
}
