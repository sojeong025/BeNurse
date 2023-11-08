import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Container from "@components/atoms/Container/Container";
import PatientItem from "@components/templates/Patient/PatientItem";
import Input from "@components/atoms/Input/Input";

// import { Select } from "./HandOverWritePage.styles";

import { usePatientStore } from "@store/store";

export default function HandOverPatientList() {
  const { setSelectedPatient } = usePatientStore();

  useEffect(() => {
    setSelectedPatient({});
  }, []);

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
  ];

  return (
    <Container
      backgroundColor={"purple"}
      flex={["center"]}
    >
      <div
        style={{
          marginTop: "30px",
          paddingTop: "74px",
          width: "calc(100% - 28px)",
        }}
      >
        {/* 인수인계 대상자(환자) 선택하기 */}
        <div style={{ marginBottom: "20px" }}>
          <Input
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
            gap: "9px",
          }}
        >
          {patients.map((patientInfo) => (
            <NavLink
              to="detail"
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
    </Container>
  );
}
