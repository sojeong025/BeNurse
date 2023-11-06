import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Common } from "../../utils/global.styles";
import Box from "../../components/atoms/Box/Box";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { customAxios } from "../../libs/axios";
import manage from "@assets/Images/manage.png";
import web_write from "@assets/Images/web_write.png";
import empty from "@assets/Images/empty.png";
import AdminCalendar from "../../components/templates/Admin/AdminCalendar";
import { useAdminStore } from "../../store/store";

export default function AdminMainPage() {
  const [hospital, setHospital] = useState(null);
  const { schedule, setSchedule } = useAdminStore((state) => state);
  const navigate = useNavigate();

  const createSchedule = () => {
    navigate("../create-schedule");
  };
  const management = () => {
    navigate("../management");
  };

  useEffect(() => {
    customAxios.get("Hospital").then((res) => {
      setHospital(res.data.responseData);
    });
  }, []);

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
          size={["830px", "600px"]}
          flex={["flex-start", "flex-start"]}
          props={"position: relative; box-sizing: border-box; padding: 30px;"}
        >
          <AdminCalendar />
          {schedule ? (
            <div></div>
          ) : (
            <div
              style={{
                width: "50%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                opacity: 0.5,
              }}
            >
              <img
                style={{ width: "140px", marginBottom: "10px" }}
                src={empty}
                alt=""
              />
              <p>근무표가 없어요</p>
            </div>
          )}
        </Box>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
        <Box
          type={"purple03"}
          size={["500px", "180px"]}
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
          size={["500px", "180px"]}
          flex={["flex-end", "flex-end"]}
          props={
            "position: relative; box-sizing: border-box; padding: 30px; cursor: pointer;"
          }
          onClick={management}
        >
          <img
            style={{
              transform: "matrix(0, 1, 1, 0, 0, 0) rotate(-90deg)",
              position: "absolute",
              zIndex: 1,
              width: "240px",
              top: "-30px",
              left: "10px",
            }}
            src={manage}
            alt=""
          />
          <p
            style={{
              fontSize: "22px",
              fontWeight: "600",
              marginRight: "10px",
              color: Common.color.purple03,
              lineHeight: "30px",
            }}
          >
            병동 관리하기
          </p>
          <BsFillArrowRightCircleFill
            style={{ zIndex: 100, marginBottom: "4px" }}
            size={24}
            color={Common.color.purple03}
          />
        </Box>
        <Box
          type={"purple00"}
          size={["500px", "140px"]}
          flex={["flex-end", "flex-start"]}
          props={
            "position: relative; flex-direction: column; box-sizing: border-box; padding: 22px; color: #757575;"
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
            <p style={{ fontSize: "16px", fontWeight: "600" }}>병원 정보</p>
          </div>
          <hr style={{ width: "100%" }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              fontSize: "14px",
            }}
          >
            <p>
              <span style={{ fontWeight: Common.fontWeight.bold }}>
                의료법인
              </span>{" "}
              {hospital ? hospital.name : null}
            </p>
            <p>
              <span style={{ fontWeight: Common.fontWeight.bold }}>주소</span>{" "}
              {hospital ? hospital.address : null}
            </p>
            <p>
              <span style={{ fontWeight: Common.fontWeight.bold }}>
                대표 전화
              </span>{" "}
              {hospital ? hospital.tel : null}
            </p>
          </div>
        </Box>
      </div>
    </div>
  );
}
