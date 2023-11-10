import React, { useEffect, useState } from "react";
import Container from "@components/atoms/Container/Container";
import Box from "@components/atoms/Box/Box";
import { NavLink } from "react-router-dom";
import { WorkPart, TemporaryBox, HandoverList } from "./HandOverPage.styles";
import write from "@assets/Images/write.png";
import nurse from "@assets/Images/nurse.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import HandOverList from "@components/templates/HandOver/HandOverList";
import { customAxios } from "../../libs/axios";
import { useWardStore } from "../../store/store";
import { useTabBarStore } from "../../store/store";

export default function HandOverPage() {
  const setWardId = useWardStore((state) => state.setWardId);
  const { currentTab, setCurrentTab } = useTabBarStore((state) => state);

  useEffect(() => {
    customAxios.get("oauth/test/user").then((res) => {
      console.log("인수인계 메인에서 사용자 정보 조회", res);
      setWardId(res.data.responseData.wardID);
    });

    setCurrentTab("handover");
  }, []);
  return (
    <Container
      overflow="hidden"
      backgroundColor={"purple"}
      flex={["center", "flex-start"]}
    >
      <div
        style={{
          marginTop: "84px",
          paddingTop: "24px",
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
                <h5>PRE</h5>
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
                <h5>NOW</h5>
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
                <h5>NEXT</h5>
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
                <span
                  style={{
                    fontWeight: "bold",
                    marginLeft: "36px",
                    fontSize: "18px",
                  }}
                >
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
                <p
                  className="temporary-title"
                  style={{ fontSize: "16px" }}
                >
                  임시저장 불러오기
                </p>
                <div className="right">
                  <p
                    className="list-count"
                    style={{ fontSize: "14px" }}
                  >
                    3
                  </p>
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
            size={["384px", "286px"]}
            props={"flex-direction:column"}
            flex={["start"]}
          >
            <div className="temporary-container">
              <div>
                <HandOverList />
              </div>
            </div>
          </Box>
        </HandoverList>
      </div>
    </Container>
  );
}
