import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Container from "@components/atoms/Container/Container";
import PatientItem from "@components/templates/Patient/PatientItem";
import Input from "@components/atoms/Input/Input";
import Button from "@components/atoms/Button/Button";

import { Select } from "./HandOverWritePage.styles";

import { usePatientStore } from "@store/store";

export default function HandOverWritePage() {
  const navigate = useNavigate();

  const { setSelectedPatient } = usePatientStore();

  useEffect(() => {
    setSelectedPatient({});
  }, []);

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
      age: "32",
      gender: "남",
      cc: "다리 외상",
      group: "내과 B동",
      room: "B503",
    },
    {
      id: "2",
      name: "김싸피",
      age: "45",
      gender: "여",
      cc: "다리 외상",
      group: "내과 B동",
      room: "B503",
    },
    {
      id: "3",
      name: "이이이",
      age: "64",
      gender: "남",
      cc: "다리 외상",
      group: "내과 B동",
      room: "B503",
    },
    {
      id: "4",
      name: "김김김",
      age: "13",
      gender: "여",
      cc: "다리 외상",
      group: "내과 B동",
      room: "B503",
    },
    {
      id: "5",
      name: "김김김",
      age: "13",
      gender: "여",
      cc: "다리 외상",
      group: "내과 B동",
      room: "B503",
    },
    {
      id: "6",
      name: "김김김",
      age: "13",
      gender: "여",
      cc: "다리 외상",
      group: "내과 B동",
      room: "B503",
    },
    {
      id: "7",
      name: "김김김",
      age: "13",
      gender: "여",
      cc: "다리 외상",
      group: "내과 B동",
      room: "B503",
    },
    {
      id: "8",
      name: "김김김",
      age: "13",
      gender: "여",
      cc: "다리 외상",
      group: "내과 B동",
      room: "B503",
    },
    {
      id: "9",
      name: "김김김",
      age: "13",
      gender: "여",
      cc: "다리 외상",
      group: "내과 B동",
      room: "B503",
    },
    {
      id: "10",
      name: "김김김",
      age: "13",
      gender: "여",
      cc: "다리 외상",
      group: "내과 B동",
      room: "B503",
    },
    {
      id: "11",
      name: "김김김",
      age: "13",
      gender: "여",
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
          position: "relative",
          marginTop: "30px",
          paddingTop: "74px",
          width: "calc(100% - 28px)",
        }}
      >
        <div>
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
              height: "550px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: "9px",
              overflowY: "auto",
              paddingBottom: "40px",
              boxSizing: "border-box",
            }}
          >
            {patients.map((patientInfo) => (
              <NavLink
                to="patients/write"
                key={patientInfo.id}
                onClick={() => setSelectedPatient(patientInfo)}
              >
                <PatientItem
                  type="patient"
                  patientInfo={patientInfo}
                />
              </NavLink>
            ))}
          </div>
        </div>

        {/* 인수자 선택
        - 환자가 최소 1명 이상 선택되었을 경우 뜨도록
      */}
        <div
          style={{
            position: "absolute",
            top: "720px",
            width: "100%",
          }}
        >
          <Button
            width="100%"
            variant="primary"
            onClick={() => navigate("nurse")}
          >
            인수자 선택
          </Button>
        </div>
      </div>
    </Container>
  );
}
