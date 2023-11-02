import React, { useState } from "react";
import Container from "@components/atoms/Container/Container";
import PatientItem from "@components/templates/Patient/PatientItem";
import Input from "@components/atoms/Input/Input";
import { Select } from "./HandOverWritePage.styles";

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
  return (
    <Container
      backgroundColor={"purple"}
      flex={["center"]}
    >
      <div style={{ marginTop: "84px", paddingTop: "24px" }}>
        {/* 인수인계 대상자(환자) 선택하기 */}
        <Select>
          <div className="header">
            <h1 className="title">인계 환자 선택하기</h1>
            <p>
              {currentDate.getFullYear()}.{currentDate.getMonth() + 1}.
              {String(currentDate.getDate()).padStart(2, "0")} ({day}) 인계장
            </p>
          </div>
          <div>
            <Input
              width={"356px"}
              variant={"search"}
              placeholder={"환자 이름으로 검색"}
            />
          </div>
        </Select>

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
      </div>
    </Container>
  );
}
