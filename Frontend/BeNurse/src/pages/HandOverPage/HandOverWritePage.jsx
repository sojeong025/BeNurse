import React, { useState } from "react";
import Container from "@components/atoms/Container/Container";
import Box from "../../components/atoms/Box/Box";
import BottomButton from "../../components/atoms/Button/BottomButton";
import PatientItem from "@components/templates/Patient/PatientItem";
import calendar from "@assets/Icons/schedule.svg";
import { useNavigate } from "react-router-dom";
import Input from "@components/atoms/Input/Input";

export default function HandOverWritePage() {
  const today = new Date();
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  let day = days[today.getDay()];
  const [currentDate, setCurrentDate] = useState(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      today.getDay(),
    ),
  );
  const navigate = useNavigate();
  const onPrevClick = () => {
    navigate(-1);
  };
  return (
    <Container
      backgroundColor={"purple"}
      flex={["center"]}
    >
      <div style={{ marginTop: "84px", paddingTop: "14px" }}>
        <Box
          type="white"
          size={["384px", "96px"]}
          margin="0 0 30px 0"
          flex={["start", "center"]}
        >
          <div style={{ marginLeft: "14px", fontSize: "18px" }}>
            <div style={{ display: "flex", marginBottom: "16px" }}>
              <img
                src={calendar}
                style={{
                  width: "16px",
                  marginRight: "10px",
                }}
              />
              <p>인계 날짜</p>
            </div>
            <div style={{ fontSize: "16px" }}>
              {currentDate.getFullYear()}.{currentDate.getMonth() + 1}.
              {String(currentDate.getDate()).padStart(2, "0")} ({day}) 나이트
              인계장
            </div>
          </div>
        </Box>

        {/* 인수인계 대상자(환자) 선택하기 */}
        <div style={{ marginBottom: "20px" }}>
          <Input
            width={"356px"}
            variant={"search"}
            placeholder={"환자 이름으로 검색"}
          />
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <PatientItem type={"select"} />
        </div>
        <BottomButton onNextClick={onPrevClick} />
      </div>
    </Container>
  );
}
