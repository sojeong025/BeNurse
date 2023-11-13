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
import nurseImg from "@assets/Images/patient_temp.png";
import { useAdminStore } from "../../store/store";

import * as S from "./AdminMainPage.styles";

export default function AdminMainPage() {
  const [hospital, setHospital] = useState(null);
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [wards, setWards] = useState(null);
  const { schedule, setSchedule, selectedDate, setSelectedDate } =
    useAdminStore((state) => state);
  const navigate = useNavigate();

  const createSchedule = () => {
    navigate("create-schedule");
  };
  const management = () => {
    navigate("management");
  };

  useEffect(() => {
    customAxios.get("Hospital").then((res) => {
      setHospital(res.data.responseData);
    });

    customAxios.get("ward/all").then((res) => {
      setWards(res.data.responseData);
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
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginLeft: "20px",
                marginBottom: "20px",
              }}
            >
              <p>{selectedDate}일 근무자</p>
              <S.StateWrapper>
                <S.State type={"D"}>DAY</S.State>
                <S.State type={"E"}>EVENING</S.State>
                <S.State type={"N"}>NIGHT</S.State>
                <S.State type={"O"}>OFF</S.State>
              </S.StateWrapper>
            </div>

            {schedule && schedule.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "500px",
                  overflow: "scroll",
                  gap: "16px",
                  marginLeft: "20px",
                }}
              >
                {schedule?.map((item) => {
                  const year = currentDate.getFullYear();
                  const month = currentDate.getMonth() + 1;
                  const ward = wards?.filter((ward) => ward.id === item.wardID);
                  return (
                    item.workdate ===
                      `${year}-${month
                        .toString()
                        .padStart(2, "0")}-${selectedDate
                        ?.toString()
                        .padStart(2, "0")}` && (
                      <Box
                        type={"white"}
                        size={["360px", "70px"]}
                        flex={["flex-start", "center"]}
                        props={
                          "box-sizing: border-box; padding-right: 14px; gap: 20px;"
                        }
                      >
                        <div
                          style={{
                            width: "20px",
                            height: "70px",
                            borderRadius: "16px 0px 0px 16px",
                            backgroundColor:
                              item.worktime === "D"
                                ? Common.color.day
                                : item.worktime === "E"
                                ? Common.color.evening
                                : Common.color.night,
                          }}
                        />
                        <img
                          style={{
                            width: "50px",
                            border: "1px solid gray",
                            borderRadius: "100px",
                          }}
                          src={nurseImg}
                          alt=""
                        />
                        <div style={{ width: "160px" }}>
                          <p style={{ fontSize: "16px", fontWeight: "600" }}>
                            {item.name}
                          </p>
                          <p style={{ fontSize: "14px", marginTop: "6px" }}>
                            {ward && ward[0].name}{" "}
                            {item.annual > 0 ? item.annual + "년차" : "신입"}
                          </p>
                        </div>
                      </Box>
                    )
                  );
                })}
              </div>
            ) : (
              <div
                style={{
                  width: "380px",
                  height: "500px",
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
          </div>
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
