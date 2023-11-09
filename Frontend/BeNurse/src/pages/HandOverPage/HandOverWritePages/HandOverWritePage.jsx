import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Container from "@components/atoms/Container/Container";
import PatientItem from "@components/templates/Patient/PatientItem";
import Input from "@components/atoms/Input/Input";
import { customAxios } from "../../../libs/axios";

import { Select } from "./HandOverWritePage.styles";

import { usePatientStore } from "@store/store";
import { useHandoverSetStore } from "../../../store/store";
import { useWardStore } from "../../../store/store";

export default function HandOverWritePage() {
  const setHandoverSetId = useHandoverSetStore(
    (state) => state.setHandoverSetId,
  );
  const { setSelectedPatient } = usePatientStore();
  const wardId = useWardStore((state) => state.wardId);
  console.log("인계장 작성페이지에서 wardId 체크", wardId);

  useEffect(() => {
    setSelectedPatient({});
  }, []);

  // 전체 인계장 SET 생성 => 인계장 ID 생성
  useEffect(() => {
    customAxios.post("HandoverSet").then((res) => {
      console.log("전체 인계장 묶음 ID 생성용", res);
      setHandoverSetId(res.data.responseData.id);
    });
  }, []);

  const handlePatientCardClick = (patientInfo) => {
    setSelectedPatient(patientInfo);
  };

  const [patientInfo, setPatientInfo] = useState([]);

  useEffect(() => {
    customAxios.get("emr/patient/wardall").then((res) => {
      console.log("병동 내 환자만 조회 결과 확인", res.data.responseData);
      const patientsCard = res.data.responseData.map((patientData) => {
        return {
          ...patientData.patient,
        };
      });
      setPatientInfo(patientsCard);
    });
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
            <div
              style={{
                fontSize: "14px",
                margin: "20px 0",
                lineHeight: "22px",
              }}
            >
              📝 각 환자의 상태와 필요한 정보를 포함한 <br />
              인계장을 작성하여, 담당 인수자에게 전달하세요.
            </div>
            <div>
              <Input
                variant={"search"}
                placeholder={"담당 병동 내 환자 이름으로 검색"}
              />
            </div>
          </Select>

          <div
            style={{
              width: "100%",
              height: "525px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: "9px",
              overflowY: "auto",
              paddingTop: "5px",
              paddingBottom: "30px",
              boxSizing: "border-box",
            }}
          >
            {patientInfo.map((patientInfo) => (
              <NavLink
                to={"/handover-write/" + patientInfo.id}
                key={patientInfo.id}
                onClick={handlePatientCardClick}
              >
                <PatientItem
                  type="handoverpatient"
                  patientInfo={patientInfo}
                />
              </NavLink>
            ))}
          </div>
        </div>

        {/* 인수자 선택
        - 환자가 최소 1명 이상 선택되었을 경우 뜨도록
      */}
        {/* <div
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
        </div> */}
      </div>
    </Container>
  );
}
