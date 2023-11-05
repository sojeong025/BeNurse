import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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

  // 임시 환자 정보
  const patients = [
    {
      id: "1",
      name: "종박사",
      cc: "다리 외상",
      group: "내과 B동",
      room: "B503",
    },
    {
      id: "2",
      name: "김싸피",
      cc: "다리 외상",
      group: "내과 B동",
      room: "B503",
    },
    {
      id: "3",
      name: "이이이",
      cc: "다리 외상",
      group: "내과 B동",
      room: "B503",
    },
    {
      id: "4",
      name: "김김김",
      cc: "다리 외상",
      group: "내과 B동",
      room: "B503",
    },
  ];

  return (
    <Container
      backgroundColor={"purple"}
      flex={["center"]}
    >
      <div
        style={{
          marginTop: "30px",
          paddingTop: "24px",
          width: "calc(100% - 28px)",
        }}
      >
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
            gap: "9px",
          }}
        >
          {patients.map((patientInfo) => (
            <NavLink
              to="patients/write"
              key={patientInfo.id}
            >
              <PatientItem
                type="patient"
                patientInfo={patientInfo}
              />
            </NavLink>
          ))}
        </div>
      </div>
    </Container>
  );
}
