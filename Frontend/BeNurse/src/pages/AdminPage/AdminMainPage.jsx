import React from "react";
import { useNavigate } from "react-router-dom";
import { Common } from "../../utils/global.styles";
import Box from "../../components/atoms/Box/Box";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import manage from "@assets/Images/manage.png";
import web_write from "@assets/Images/web_write.png";

export default function AdminMainPage() {
  const navigate = useNavigate();

  const createSchedule = () => {
    navigate("../create-schedule");
  };

  const management = () => {
    navigate("../management");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        height: "calc(100vh - 60px)",
        backgroundColor: Common.color.purple00,
        gap: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <Box
          type={"white"}
          size={["400px", "400px"]}
          flex={["flex-start", "flex-start"]}
          props={
            "position: relative; flex-direction: column; box-sizing: border-box; padding: 30px;"
          }
        >
          {/* <img
            style={{
              position: "absolute",
              bottom: "-20px",
              right: "-50px",
              width: "160px",
            }}
            src={megaphone}
            alt=""
          /> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <p style={{ fontSize: "22px", fontWeight: "600" }}>공지사항</p>
            <div style={{ cursor: "pointer" }}>
              <p style={{ fontSize: "14px", fontWeight: "600" }}>전체보기</p>
            </div>
          </div>
          <hr style={{ width: "100%" }} />
        </Box>
        <Box
          type={"white"}
          size={["400px", "160px"]}
          flex={["flex-start", "flex-end"]}
          props={
            "position: relative; box-sizing: border-box; padding: 30px; cursor: pointer;"
          }
        >
          <p
            style={{
              fontSize: "22px",
              fontWeight: "600",
              marginRight: "10px",
              color: Common.color.purple03,
              lineHeight: "30px",
            }}
          >
            환자 정보
            <br />
            입/퇴원 관리
          </p>
          <BsFillArrowRightCircleFill
            style={{ zIndex: 100, marginBottom: "4px" }}
            size={24}
            color={Common.color.purple03}
          />
          <img
            style={{
              transform: "matrix(0, 1, 1, 0, 0, 0) rotate(-90deg)",
              position: "absolute",
              zIndex: 1,
              width: "200px",
              top: "-20px",
              right: "0px",
            }}
            src={manage}
            alt=""
          />
        </Box>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <Box
          type={"purple03"}
          size={["500px", "160px"]}
          flex={["flex-start", "flex-end"]}
          props={
            "box-sizing: border-box; padding: 30px; position: relative; cursor: pointer;"
          }
          onClick={createSchedule}
        >
          <img
            style={{
              position: "absolute",
              top: "-70px",
              right: "-90px",
              transform: "rotate(32deg)",
              width: "400px",
              marginRight: "40px",
            }}
            src={web_write}
            alt=""
          />
          <p
            style={{ fontSize: "22px", fontWeight: "600", marginRight: "10px" }}
          >
            근무표 작성하러 가기
          </p>
          <BsFillArrowRightCircleFill size={24} />
        </Box>
        <Box
          type={"white"}
          size={["500px", "400px"]}
          flex={["flex-start", "flex-start"]}
          props={
            "position: relative; flex-direction: column; box-sizing: border-box; padding: 30px;"
          }
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <p style={{ fontSize: "22px", fontWeight: "600" }}>병원 정보</p>
            <div
              style={{ cursor: "pointer" }}
              onClick={management}
            >
              <p style={{ fontSize: "14px", fontWeight: "600" }}>병동 관리</p>
            </div>
          </div>
          <hr style={{ width: "100%" }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              fontSize: "18px",
            }}
          >
            <p>
              <span style={{ fontWeight: Common.fontWeight.bold }}>
                의료법인
              </span>{" "}
              갑을의료재단 갑을녹산병원
            </p>
            <p>
              <span style={{ fontWeight: Common.fontWeight.bold }}>주소</span>{" "}
              (46744)부산광역시 강서구 녹산산단321로 24-8
            </p>
            <p>
              <span style={{ fontWeight: Common.fontWeight.bold }}>
                대표 전화
              </span>{" "}
              051-974-8300
            </p>
          </div>
        </Box>
      </div>
    </div>
  );
}
